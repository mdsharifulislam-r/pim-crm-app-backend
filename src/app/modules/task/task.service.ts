import { JwtPayload } from "jsonwebtoken";
import QueryBuilder from "../../query/QueryBuilder";
import { ITask } from "./task.interface";
import { Task } from "./task.model";
import { dateHelper } from "../../../helpers/dateHelper";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { User } from "../user/user.model";
import { TASK_STATUS } from "../../../enums/task";
import ApiError from "../../../errors/ApiErrors";
import { sendNotifations } from "../../../helpers/notifacationHelper";
import { createActivity } from "../../../helpers/activityHelper";
import { ACTIVITY_STATUS } from "../../../enums/activity";

const createTaskToDB = async (data:ITask) => {
    const task = await Task.create(data);
    const user = await User.findById(data.authorizer);
    const assignBy = await User.findById(data.assign_to);
    await sendNotifations({
        title: `New Task Assigned to you`,
        text: `You have been assigned a new task by ${user?.firstName} ${user?.lastName}`,
        type: "group",
        link: "task",
        reference:`${task._id}`,
    },
    [data.assign_to]
)
if(!data.private)
{
    await createActivity({
        title:"Task Created",
        status:ACTIVITY_STATUS.SUCCESS,
        todos:[
            {
                title:`Task Created by ${user?.firstName} ${user?.lastName} name ${data.name}`,
                status:ACTIVITY_STATUS.SUCCESS
            },
            {
                title:`Task Assigned to ${assignBy?.firstName} ${assignBy?.lastName}`,
                status:ACTIVITY_STATUS.INFO,
                date:data.standard_due_date
            }
    
        ]
    })
}


    return task;
}

const getAllTasksFromDB=async(query:Record<string,any>,user:JwtPayload)=>{
    const result = new QueryBuilder(Task.find({status:'active'}),query)
    const tasks = await result.modelQuery.populate([
        {
            path:'authorizer',
            select:['firstName','lastName','email']
        },
        {
            path:'assign_to',
            select:['firstName','lastName','email']
        }
    ]).sort({standard_due_date:-1}).lean()

    const groupData = await Task.aggregate([
        {
            $match:{
                status:'active'
            }
        },
        {
            $group:{
                _id:"$task_status",
                count:{
                    $sum:1
                }
            }
        }
    ])

    const filterTasks  = await Promise.all(tasks.filter((task:any)=>{
        const search = query?.searchTerm?.toLowerCase()
        const assign_To = task.assign_to?.firstName?.toLowerCase() + ' '+ task.assign_to?.lastName?.toLowerCase();
        const authorizer = task.authorizer?.firstName?.toLowerCase() + ' '+ task.authorizer?.lastName?.toLowerCase();

        return (
            !search || (
                task.name.toLowerCase().includes(search) ||
                task.task_type.toLowerCase().includes(search) ||
                assign_To.includes(search) ||
                authorizer.includes(search)
            )
        ) && (
            (!query.status || task.task_status.toLowerCase() === query.status.toLowerCase()) &&
            (!query.priority || task.priority.toLowerCase() === query.priority.toLowerCase()) &&
            (!query.category || task.task_type.toLowerCase() === query.category.toLowerCase()) &&
            (!query.assignee || task.assign_to._id.toString() === query.assignee) 
        ) && (
            !query.dateFormat || (
                (query.dateFormat == 'today' && dateHelper.dateCompare(task.createdAt,0)) ||
                (query.dateFormat == 'week' && dateHelper.dateCompare(task.createdAt,7)) ||
                (query.dateFormat == 'month' && dateHelper.dateCompare(task.createdAt,30)) 
            )
        ) && (
            !task.private || (
                task.assign_to?._id.toString() === user.id ||
                task.authorizer?._id.toString() === user.id
            )
        )
    }).map(async (task:any)=>{
        const authorizer = task.authorizer._id
        const teamManagers = await getTeamManagers(authorizer,[])

        return {
            ...task,
            team_managers:[...new Set(teamManagers)]
        }

    }))
    const paginatateArray = paginationHelper.paginateArray(filterTasks,query)
    return {
        data:{
            data:paginatateArray.data,
            groupData:groupData
        },
        pagination:paginatateArray.pagination
    }
}

async function getTeamManagers(user:any,managers:any[]){
    if(!user) return managers

    const userData = await User.findById(user)

    return getTeamManagers(userData?.authorizer,[...managers,{_id:user,name:`${userData?.firstName} ${userData?.lastName}`}])
}

const updateTaskInDB= async (id:string,data:Partial<ITask>)=>{
    return await Task.findByIdAndUpdate(id,data).populate('authorizer').exec()
}

const deleteTaskFromDB= async (id:string)=>{
    const deleted= await Task.findByIdAndUpdate(id,{status:'deleted'}).exec()
    const user = await User.findById(deleted?.authorizer)
    await createActivity({
        title:"Task Deleted",
        status:ACTIVITY_STATUS.ERROR,
        todos:[
            {
                title:`Task Deleted by ${user?.firstName} ${user?.lastName} name ${deleted?.name}`,
                status:ACTIVITY_STATUS.ERROR
            }
        ]
    })
}

const getSingleTaskFromDB= async (id:string)=>{
    const task = await Task.findOne({_id:id,status:'active'}).populate([{
        path:'authorizer',
        select:['firstName','lastName','email']
    },
    {
        path:'assign_to',
        select:['firstName','lastName','email']
    }
])
return task
}

const chagneTaskStatusInDB= async (taskId:string,newStatus:TASK_STATUS)=>{
    const task = await Task.findOne({_id:taskId})
    if(newStatus==task?.task_status){
        throw new ApiError(409,'You can not change the status to same')
    }
    if(task?.task_status==TASK_STATUS.DONE){
        throw new ApiError(409,'You can not change the status of done task')
    }
    if(newStatus==TASK_STATUS.PENDING && task?.task_status!=TASK_STATUS.IN_PROGRESS){
        throw new ApiError(409,'You can only change the status to pending when it is in progress')
    }
    const update =await Task.findByIdAndUpdate(taskId,{task_status:newStatus},{new:true})

    sendNotifations({
        title:'Task Status Changed',
        text:`Your task status has been changed to ${newStatus}`,
        type:'general',
        link:"task",
        reference:update?._id.toString(),
    },[update?.authorizer,update?.assign_to])

    if(!update?.private){
        await createActivity({
            title:'Task Status Changed',
            status:ACTIVITY_STATUS.INFO,
            todos:[
            {
                title:`Task Status Changed to ${newStatus} of ${update?.name}`,
                status:ACTIVITY_STATUS.INFO,
            }
            ]
        })
    }
    return update
}

const getTaskAccordingToDate = async (date:string)=>{
    const inputDate = new Date(date);
    const year = inputDate.getUTCFullYear();
    const month = inputDate.getUTCMonth(); // 0-based

    const startDate = new Date(Date.UTC(year, month, 1));
    const endDate = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999));

    const tasks = await Task.find({
        status:'active',
        createdAt:{
            $gte:startDate,
            $lte:endDate
        }
    }).sort({standard_due_date:-1}).lean()
    const tasksAccordingToDate = tasks.map((task:any)=>{
        const taskDate = new Date(task.createdAt).getDate()
        const finistDate = new Date(task.standard_due_date).getDate()

        return {
            ...task,
            start:taskDate,
            end:finistDate,
        }
    })

    return tasksAccordingToDate
}
export const TaskService={
    createTaskToDB,
    getAllTasksFromDB,
    updateTaskInDB,
    deleteTaskFromDB,
    getSingleTaskFromDB,
    chagneTaskStatusInDB,
    getTaskAccordingToDate,
}