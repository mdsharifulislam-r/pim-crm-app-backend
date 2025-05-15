import { Model, Types } from "mongoose";

export type IRecovery = {
    source: Types.ObjectId;
    amount: number;
    case: Types.ObjectId;
};
export type RecoveryModel = Model<IRecovery>;