import { model, Schema } from "mongoose";
import { DAMAGE_TYPE } from "../../../../../enums/damage";
import { DamageModel, IDamage } from "./damage.interface";

const damageSchema = new Schema<IDamage,DamageModel>(
    {
        type: {
            type: String,
            enum: Object.values(DAMAGE_TYPE),
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        case: {
            type: Schema.Types.ObjectId,
            ref: "Case",
            required: true,
        },
        provider: {
            type: Schema.Types.ObjectId,
            ref: "Provider",
            required: true,
        }
    },
    {
        timestamps: true,
    }
);
export const Damage = model<IDamage,DamageModel>("Damage", damageSchema);