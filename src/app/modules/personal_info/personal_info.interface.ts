import { Model, Types } from "mongoose";

export type IPersonalInfo = {
    name:string,
    date_of_birth?:Date,
    email:string,
    phone_numbers?:string[],
    social_security_number?:string,
    case:Types.ObjectId,
};

export type PersonalInfoModel = Model<IPersonalInfo>;