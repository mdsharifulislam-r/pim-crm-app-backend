import { Model, Types } from "mongoose";
import { TASK_PRIORITY, TASK_STATUS, TASK_TYPE } from "../../../enums/task";

export type ITask = {
    name: string;
    description?: string;
    priority: TASK_PRIORITY;
    status:"active"|"deleted"|"completed";
    task_status?:TASK_STATUS;
    assign_to?:Types.ObjectId;
    private?:boolean;
    authorizer:Types.ObjectId;
    task_estimate_time?:string;
    task_type:TASK_TYPE;
    standard_due_date?:Date;
    relative_due_date?:{
        due_date:number;
        days:"buisness_days"|"calendar_days";
        diraction:"before"|"after";
    }
    exist_task?:Types.ObjectId,
    matter?:Types.ObjectId;

}

export type TaskModel= Model<ITask>