import { Model, Types } from "mongoose"
import { CASE_LOCATION, MATTER_STAGE, PRACTICE_AREA } from "../../../enums/case"

export type ICase = {
    client:Types.ObjectId,
    description:string,
    status:"open"|"closed",
    responsible_attorney:Types.ObjectId,
    origianing_attorney:Types.ObjectId,
    client_refference_number?:string,
    location:CASE_LOCATION,
    practice_area:PRACTICE_AREA,
    matter_stage:MATTER_STAGE,
    matter_type:"open"|"closed"
    open_date:Date
    close_date?:Date
    pending_date?:Date,
    limitaion_date:Date,
    matter_permission:"everyone"|"group",
    group_user?:Types.ObjectId[],
    matter_notification_user?:Types.ObjectId[],
    block_user?:Types.ObjectId[]
    realeted_contact?:Types.ObjectId,
    realeted_contact_relation?:string,
    bill:'recipient'|'other',
    custom_fields:Types.ObjectId[],
    billing_method:"hourly"|"contingency",
    balance_notification?:boolean,
    recipient?:string,
    billing_rate?:number,
    deduct_expenses_first?:boolean,
    task_list?:Types.ObjectId[],
    folder_name:string,
    folder_category:string,
    originating_attorney_allocation:number,
    responsible_attorney_allocation:number,
    use_firm_settings:boolean,
    authorizer:Types.ObjectId,
    providers?:string[]

}

export type CaseModel = Model<ICase>