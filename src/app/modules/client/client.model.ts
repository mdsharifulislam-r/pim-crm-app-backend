import { Schema, model } from 'mongoose';
import { IClient, ClientModel } from './client.interface';
import { IClientType } from '../../../enums/client';

const clientSchema = new Schema<IClient, ClientModel>(
    {
        type: {
            type: String,
            enum: Object.values(IClientType),
            required: true
        },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        authorizer: { type: Schema.Types.ObjectId, required: true },
        address: { type: String, required: true },
        country: { type: String, required: true },
        city: { type: String, required: true },
        tags: { type: [String], required: true },
        file: { type: [String], required: true }
    },
    { timestamps: true }
);

clientSchema.index({ name: 'text', email: 'text', phone: 'text' });
clientSchema.index({ authorizer: 1, type: 1 });

export const Client = model<IClient, ClientModel>('Client', clientSchema);