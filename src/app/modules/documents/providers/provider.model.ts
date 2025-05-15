import { model, Schema } from "mongoose";
import { IProvider, ProviderModel } from "./provider.interface";
import { PROVIDER_STATUS } from "../../../../enums/provider";

const providerSchema = new Schema<IProvider, ProviderModel>(
    {
        case: {
            type: Schema.Types.ObjectId,
            ref: "Case",
            required: true,
        },
        providerName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        first_treatment_date: {
            type: String,
            required: true,
        },
        last_treatment_date: {
            type: String,
            required: true,
        },
        is_completed: {
            type: Boolean,
            default: false,
        },
        medical_record_request_date: {
            type: Date,
        },
        medical_record_follow_up_date: {
            type: Date,
        },
        medical_record_status: {
            type: String,
            enum: Object.values(PROVIDER_STATUS),
        },
        medical_bill_request_date: {
            type: Date,
        },
        medical_bill_follow_up_date: {
            type: Date,
        },
        medical_bill_status: {
            type: String,
            enum: Object.values(PROVIDER_STATUS),
        },
    }
);

export const Provider = model<IProvider, ProviderModel>("Provider", providerSchema);