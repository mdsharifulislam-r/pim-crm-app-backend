import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { TaskService } from "./task.service";
import sendResponse from "../../../shared/sendResponse";

const createTask = catchAsync(
    async (req:Request,res:Response)=>{
        const user = req.user;
        const result=await TaskService.createTaskToDB({...req.body,authorizer:user.id})
        sendResponse(res,{
            statusCode:201,
            message:"Task created successfully",
            data:result,
            success:true,
        })
    }
)

const getAllTasks =catchAsync(
    async(req:Request,res:Response)=>{
        const user=req.user;
        const query=req.query;
        const result= await TaskService.getAllTasksFromDB(query,user)
        sendResponse(res,{
            statusCode:200,
            message:"All tasks fetched successfully",
            data:result.data,
            success:true,
            pagination:result.pagination
        }
        )
    }
)

const getSingleTask =catchAsync(
    async(req:Request,res:Response)=>{
        const id=req.params.id;
        const result=await TaskService.getSingleTaskFromDB(id);
        sendResponse(res,{
            statusCode:200,
            message:"Task fetched successfully",
            data:result,
            success:true,
        }
        )
    }
)

const updateTask =catchAsync(
    async(req:Request,res:Response)=>{
        const id=req.params.id;
        const result=await TaskService.updateTaskInDB(id,{...req.body});
        sendResponse(res,{
            statusCode:200,
            message:"Task updated successfully",
            data:result,
            success:true,
        }
        )
    }
)

const deleteTask =catchAsync(
    async(req:Request,res:Response)=>{
        const id=req.params.id;
        const result=await TaskService.deleteTaskFromDB(id);
        sendResponse(res,{
            statusCode:200,
            message:"Task deleted successfully",
            data:result,
            success:true,
        }
        )
    }
)

const changeStatus =catchAsync(
    async(req:Request,res:Response)=>{
        const id=req.params.id;
        const result=await TaskService.chagneTaskStatusInDB(id,req.body.status);
        sendResponse(res,{
            statusCode:200,
            message:"Task status changed successfully",
            data:result,
            success:true,
        }
        )
    }
)

const taskDates =catchAsync(
    async(req:Request,res:Response)=>{
        const date = req.query.date;
        const result=await TaskService.getTaskAccordingToDate(date as string);
        sendResponse(res,{
            statusCode:200,
            message:"Task dates fetched successfully",
            data:result,
            success:true,
        }
        )
    }
)

export const TaskController={
    createTask,
    getAllTasks,
    getSingleTask,
    updateTask,
    deleteTask,
    changeStatus,
    taskDates
}