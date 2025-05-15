import { Schema, model } from 'mongoose';
import { IClient, ClientModel } from './contact.interface';
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
        authorizer: { type: Schema.Types.ObjectId,ref:"User", required: true },
        address: { type: String, required: true },
        country: { type: String, required: true },
        city: { type: String, required: true },
        tags: { type: [String], required: true },
        profile: {
            url: { type: String, required: false,default:'https://res.cloudinary.com/dzo4husae/image/upload/v1733459922/zfyfbvwgfgshmahyvfyk.png' },
            public_id: { type: String, required: false }
        }
    },
    { timestamps: true }
);

clientSchema.index({ name: 'text', email: 'text', phone: 'text' });
clientSchema.index({ authorizer: 1, type: 1 });

export const Client = model<IClient, ClientModel>('Client', clientSchema);