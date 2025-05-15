import { Model, Types } from "mongoose";
import { ACTIVITY_STATUS } from "../../../enums/activity";

export type IActivity = {
title: string;
status: ACTIVITY_STATUS;
todos:{
    title: string;
    date?: Date;
    status: ACTIVITY_STATUS;
}[]
for?:"global"|"chat";
chatId?:Types.ObjectId;
user?:Types.ObjectId;
};

export type ActivityModel = Model<IActivity, Record<string, any>>;