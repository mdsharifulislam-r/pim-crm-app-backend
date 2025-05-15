import { Model, Types } from "mongoose";

export type ILegalFee = {
    source: Types.ObjectId;
    reciept: Types.ObjectId;
    rate: number;
    orginal_amount: number;
    discount: number;
    case: Types.ObjectId;
};
export type LegalFeeModel = Model<ILegalFee>;