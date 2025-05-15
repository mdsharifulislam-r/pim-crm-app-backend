import { model, Schema } from "mongoose";
import { ILegalFee, LegalFeeModel } from "./legalfee.interface";

const legalFeeSchema = new Schema<ILegalFee, LegalFeeModel>(
    {
        source: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
        reciept: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        rate: { type: Number, required: true },
        orginal_amount: { type: Number, required: true },
        discount: { type: Number, required: false, default: 0 },
        case: { type: Schema.Types.ObjectId, ref: 'Case', required: true },
    },
    { timestamps: true }
);
export const LegalFee = model<ILegalFee, LegalFeeModel>('LegalFee', legalFeeSchema);