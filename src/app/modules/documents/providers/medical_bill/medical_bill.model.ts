import mongoose, { Schema } from "mongoose";
import { IMedicalBill, MedicalBillModel } from "./medical_bill.interface";

const medicalBillSchema = new Schema<IMedicalBill,MedicalBillModel>({
    provider:{type:Schema.Types.ObjectId,ref:"Provider",required:true},
    authorizer:{type:Schema.Types.ObjectId,ref:"User",required:true},
    name:{type:String,required:true},
    filePath:{
        url:{type:String,required:true},
        public_id:{type:String,required:true}
    },
    bill_date:{type:Date,required:false},
    received_date:{type:Date,required:true},
    bill_amount:{type:Number,required:false},
    adjustment_amount:{type:Number,required:false},
    owed_amount:{type:Number,required:false},
    status:{type:String,enum:["received","incomplete"],required:true},
    isLien:{type:Boolean,required:false,default:false},
    record_start_date:{type:Date,required:false},
    record_end_date:{type:Date,required:false},
    fileType:{type:String,enum:["bill","record"],required:true},
    case:{type:Schema.Types.ObjectId,ref:"Case",required:true},
},{
    timestamps:true
})

export const MedicalBill = mongoose.model<IMedicalBill,MedicalBillModel>("MedicalBill",medicalBillSchema)