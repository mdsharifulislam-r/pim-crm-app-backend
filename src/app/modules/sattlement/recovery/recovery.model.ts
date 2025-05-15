import { model, Schema } from "mongoose";
import { IRecovery, RecoveryModel } from "./recovery.interface";

const recoverySchema = new Schema<IRecovery, RecoveryModel>(
    {
        source: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
        amount: { type: Number, required: true },
        case: { type: Schema.Types.ObjectId, ref: 'Case', required: true },
    },
    { timestamps: true }
);

export const Recovery = model<IRecovery, RecoveryModel>('Recovery', recoverySchema);