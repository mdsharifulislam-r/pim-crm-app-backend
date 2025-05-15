import mongoose from "mongoose";
import { IInsruance, InsuranceModel } from "./insurance.inerface";

const insuranceSchema = new mongoose.Schema<IInsruance,InsuranceModel>({
    type:{
        type:String,
        enum:['auto','health'],
        required:true
    },
    adjuster:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    note:{
        type:String,
    },
    policy_number:{
        type:String,
    },
    phone:{
        type:String,
        required:true
    },
    policy_holder:{
        type:String,
    },
    insurance_provider:{
        type:String,
    },
    case:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Case',
        required:true
    }

}
,{
timestamps:true
})

export const Insurance = mongoose.model<IInsruance,InsuranceModel>('Insurance',insuranceSchema);