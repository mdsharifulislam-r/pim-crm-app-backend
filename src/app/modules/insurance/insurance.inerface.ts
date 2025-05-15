import { Model, Types } from "mongoose";

export type IInsruance = {
    type :"auto"|"health",
    insurance_provider?:string,
    policy_number?:string,
    adjuster?:string;
    policy_holder?:string;
    email:string;
    phone:string;
    note?:string;
    case:Types.ObjectId;
}

export type InsuranceModel = Model<IInsruance>;