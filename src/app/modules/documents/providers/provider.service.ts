import { JwtPayload } from "jsonwebtoken";
import { IProvider } from "./provider.interface";
import { caseAuthorized } from "../../../../util/caseAuthorized";
import { Provider } from "./provider.model";
import { Task } from "../../task/task.model";
import { TASK_PRIORITY, TASK_STATUS, TASK_TYPE } from "../../../../enums/task";
import { MedicalBill } from "./medical_bill/medical_bill.model";
import { Damage } from "./damages/damage.model";
import QueryBuilder from "../../../query/QueryBuilder";

const createMedicalProvider = async (payload: IProvider,user:JwtPayload) => {
    await caseAuthorized(payload.case,user.id)

    const result = await Provider.create(payload);
    if(payload.isMedicalTask){
        await Task.create({
            name:"Follow up with client regarding treatment record",
            description:"Follow up with client regarding treatment record",
            authorizer:user.id,
            standard_due_date:payload.medical_record_follow_up_date,
            priority:TASK_PRIORITY.MEDIUM,
            task_type:TASK_TYPE.CLIENT_FOLLOW_UP,
            task_status:TASK_STATUS.PENDING,
            matter:payload.case,
        })
    }
    if(payload.isMedicalBillTask){
        await Task.create({
            name:"Follow up with client regarding medical bill",
            description:"Follow up with client regarding medical bill",
            authorizer:user.id,
            standard_due_date:payload.medical_bill_follow_up_date,
            priority:TASK_PRIORITY.MEDIUM,
            task_type:TASK_TYPE.CLIENT_FOLLOW_UP,
            task_status:TASK_STATUS.PENDING,
            matter:payload.case,
        })
    }
    return result;
};

const getMedicalProviders = async (caseId:string,query:Record<string, any>) => {
    const resultData = new QueryBuilder(Provider.find({case:caseId}),query).search(['providerName']).paginate().sort()
    const result = await resultData.modelQuery.lean()
    const mixData = await Promise.all(result.map(async (provider) => {
        const records = await MedicalBill.find({provider:provider._id}).lean()
        const damages = await Damage.find({provider:provider._id}).lean()
        return {
            ...provider,
            records,
            damages
        }
    }))
    const paginationInfo = await resultData.getPaginationInfo()
    return {pagination:paginationInfo,data:mixData}
    
}

const updateProvider = async (id:string,payload:Partial<IProvider>,user:JwtPayload) => {
    const provider = await Provider.findById(id)
    await caseAuthorized(provider?.case as any,user.id)
    const result = await Provider.findByIdAndUpdate({_id:id},payload,{new:true})
    return result
}

export const ProviderService = {
    createMedicalProvider,
    getMedicalProviders,
    updateProvider
}