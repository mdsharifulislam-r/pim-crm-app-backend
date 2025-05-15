import mongoose from "mongoose";
import { IPersonalInfo, PersonalInfoModel } from "./personal_info.interface";

const personalInfoSchema = new mongoose.Schema<IPersonalInfo,PersonalInfoModel>({
    case:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Case"
    },
    date_of_birth:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    phone_numbers:[String],
    social_security_number:{
        type:String,
    }
},{
    timestamps:true
})
personalInfoSchema.index({case:1});
export const PersonalInfo = mongoose.model<IPersonalInfo,PersonalInfoModel>("PersonalInfo",personalInfoSchema);