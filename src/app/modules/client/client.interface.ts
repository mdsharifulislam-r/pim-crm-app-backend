import { Model, Types } from 'mongoose';
import { IClientType } from '../../../enums/client';

export type IClient = {
    _id?: Types.ObjectId;
    authorizer: Types.ObjectId;
    type: IClientType;
    name: string;
    email: string;
    phone: string;
    address: string;
    country: string;
    city: string;
    tags: string[];
    file?: string[];
};

export type ClientModel = Model<IClient, ClientModel>;