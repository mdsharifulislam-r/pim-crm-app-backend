import { Model, Types } from "mongoose";

export type IMedicalBill = {
    fileType:"bill"|"record"
    provider:Types.ObjectId,
    authorizer:Types.ObjectId,
    case:Types.ObjectId,
    name:string,
    filePath:{
        url:string,
        public_id:string,
    },
    bill_date:Date,
    received_date:Date,
    bill_amount?:number,
    adjustment_amount?:number,
    owed_amount?:number,
    status:"received"|"incomplete"
    record_start_date?:Date,
    record_end_date?:Date,
    isLien?:boolean,
};
export type MedicalBillModel = Model<IMedicalBill>