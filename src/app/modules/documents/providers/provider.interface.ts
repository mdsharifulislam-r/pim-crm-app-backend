import { Model, Types } from "mongoose"
import { PROVIDER_STATUS } from "../../../../enums/provider"

export type IProvider = {
    case:Types.ObjectId,
    providerName:string
    description?:string,
    first_treatment_date:string,
    last_treatment_date:string,
    is_completed?:boolean,
    medical_record_request_date?:Date,
    medical_record_follow_up_date?:Date,
    medical_record_status:PROVIDER_STATUS,
    isMedicalTask?:boolean,
    medical_bill_request_date?:Date,
    medical_bill_follow_up_date?:Date,
    medical_bill_status:PROVIDER_STATUS,
    isMedicalBillTask?:boolean,
}

export type ProviderModel = Model<IProvider>