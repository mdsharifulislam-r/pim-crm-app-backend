import { JwtPayload } from "jsonwebtoken";
import { TASK_STATUS } from "../../../enums/task";
import QueryBuilder from "../../query/QueryBuilder";
import { Client } from "../contacts/contact.model";
import { PersonalInfo } from "../personal_info/personal_info.model";
import { Task } from "../task/task.model";
import { ICase } from "./case.interface";
import { Case } from "./case.model";
import { caseAuthorized } from "../../../util/caseAuthorized";
import { MedicalBill } from "../documents/providers/medical_bill/medical_bill.model";
import { Damage } from "../documents/providers/damages/damage.model";
import { Expense } from "../documents/expenses/expense.model";
import { createActivity } from "../../../helpers/activityHelper";
import { ACTIVITY_STATUS } from "../../../enums/activity";
import { caseNotification, sendNotifations } from "../../../helpers/notifacationHelper";
import { User } from "../user/user.model";

const createCaseToDB = async (data:ICase)=>{
    const result=await Case.create({...data,group_user:[...data?.group_user||[],data.authorizer]})
    const data2 = await Promise.all(result.task_list?.map(async (item)=>{
        const existTask = await Task.findById(item).lean()
        
        const newData = {...existTask, matter:result._id,task_status:TASK_STATUS.PENDING}
        delete newData._id
     
      return await Task.create(newData)
    })!)

    const client = await Client.findOne({_id:data.client}).lean()

    const createInitalPersonalInfo = await PersonalInfo.create({
        name:client?.name,
        email:client?.email,
        phone_numbers:[client?.phone],
        case:result._id,
    })

    

    await createActivity({
        title:'Case Created',
        status:ACTIVITY_STATUS.SUCCESS,
        todos:[
            {
                title:`Take a case of a ${client?.name}`,
                status:ACTIVITY_STATUS.INFO
            }
        ]
    })

    const userData = await User.findById(data.authorizer).lean()

    await caseNotification({
        title:`New Case Taken`,
        text:`New Case for you from ${client?.name} taken by ${userData?.firstName} ${userData?.lastName}`,
        type:'general',
        link:"case",
    },result._id as  any)
    
    return result
}

const getAllCasesFromDB = async (query:Record<string,any>)=>{

    const result = new QueryBuilder(Case.find(),query).sort().filter().paginate()
    const paginationResult = await result.getPaginationInfo()
    const data = await result.modelQuery.lean()

    return {paginationResult,data}
    
}

const updateCaseById = async (_id:any,data:Partial<ICase>,user:JwtPayload)=>{
    const caseData = await Case.findOne({_id:_id})
    if(caseData?.matter_permission=='group' && !caseData?.group_user?.includes(user.id)){
        throw new Error('You are not authorized to edit this case')
    }
   
    const result = await Case.findByIdAndUpdate(_id,data,{new:true})

    await createActivity({
        title:'Case Updated',
        status:ACTIVITY_STATUS.SUCCESS,
        todos:[
            {
                title:`Update case of ${caseData?.client}`,
                status:ACTIVITY_STATUS.INFO
            }
        ],
        user:user.id
    })

    if(data.matter_stage !== caseData?.matter_stage){
        await createActivity({
            title:'Case Stage Updated',
            status:ACTIVITY_STATUS.SUCCESS,
            todos:[
                {
                    title:`Update case stage of ${caseData?.client}`,
                    status:ACTIVITY_STATUS.INFO
                },
                {
                    title:`Case Stage: ${data.matter_stage}`,
                    status:ACTIVITY_STATUS.SUCCESS
                }
            ],
            user:user.id
        })

        await caseNotification({
            title:`Case Stage Updated`,
            text:`Case Stage Updated to ${data.matter_stage}`,
            type:'general',
            link:"case",
        },result?._id as  any)
    }


    return result
}

const overViewofCases = async ()=>{
    const places = await Case.aggregate([
        {
            $group:{
                _id:"$location",
                count:{$sum:1},
            }
        }
    ])

    const stages = await Case.aggregate([
        {
            $group:{
                _id:"$matter_stage",
                count:{$sum:1},
            }
        }
    ])

    const count = await Case.countDocuments()

    const customizeStages = stages.map(item=>{
        return {
            label:item._id,
            value:(item.count/count)*100
        }
    })

    return {
        place:places,
        stage:customizeStages
    }

}

const addProviderIntoDB = async (_id:any,provider:string[],user:JwtPayload)=>{
    caseAuthorized(_id,user.id)
    const result = await Case.findByIdAndUpdate(_id,{providers:provider},{new:true})
    return result
}

const getCaseDocumentPreview = async (id:string)=>{
    const billData = await MedicalBill.find({case:id,$and:[
        {
            bill_amount:{
                $gte:1
            }

        }
    ]}).lean()
    let totalBillAndDamageAndExpense = 0
    let totalPaidOrDamages = 0
    let totalPaidOwdAndDamages = 0
    const mapedData = billData.map(item=>{
        totalBillAndDamageAndExpense+=item.bill_amount||0
        totalPaidOrDamages+=(item.bill_amount!-item.adjustment_amount!)
        totalPaidOwdAndDamages+=((item.bill_amount!-item.adjustment_amount!)+item.owed_amount!)
    })

    const damages = (await Damage.find({case:id}).lean()).forEach(item=>{
        totalBillAndDamageAndExpense+=item.amount
    })

    const expenses = (await Expense.find({case:id}).lean()).forEach(item=>{
        totalBillAndDamageAndExpense+=item.amount
        totalPaidOrDamages+=item.amount
        totalPaidOwdAndDamages+=item.amount
    })

    return {
        totalBillAndDamageAndExpense,
        totalPaidOrDamages,
        totalPaidOwdAndDamages
    }


}

export const CaseService={
    createCaseToDB,
    getAllCasesFromDB,
    updateCaseById,
    overViewofCases,
    addProviderIntoDB,
    getCaseDocumentPreview
}