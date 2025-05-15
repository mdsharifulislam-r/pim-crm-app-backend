import { Model, Types } from 'mongoose';

export type INotification = {
    text: string;
    title: string;
    receivers?: Types.ObjectId[];
    read?: boolean;
    type:"general"|"chat"|"group",
    reference?:string,
    readers?:Types.ObjectId[],
    link:"task"|"case"|"chat"|"group"|"user"|"document"|"team"|"client"
};

export type NotificationModel = Model<INotification>;