import { Model, Types } from "mongoose";

export type IMessage = {
    _id: string;
    sender: Types.ObjectId;
    content?: string;
    file?: {
        url: string;
        public_id: string;
    };
    channel: Types.ObjectId;
    isLink?: boolean;
}

export type MessageModel = Model<IMessage>;