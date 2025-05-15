import mongoose, { Schema } from "mongoose";
import { ITask, TaskModel } from "./task.interface";
import { TASK_PRIORITY, TASK_STATUS, TASK_TYPE } from "../../../enums/task";

const taskSchema = new mongoose.Schema<ITask,TaskModel>({
    name: { type: String, required: true },
    description: { type: String },
    priority: {
      type: String,
      enum: Object.values(TASK_PRIORITY),
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'deleted','completed'],
      default: 'active',
      required: true
    },
    task_status: {
      type: String,
      enum: Object.values(TASK_STATUS),
      required: false,
      default:TASK_STATUS.PENDING
    },
    assign_to: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    private: { type: Boolean, default: false },
    authorizer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    task_estimate_time: {
      type: String,
      required: false
    },
    task_type: {
      type: String,
      enum: Object.values(TASK_TYPE),
      required: true
    },
    standard_due_date: {
      type: Date,
      required: false
    },
    relative_due_date: {
      due_date: { type: Number, required: false },
      days: {
        type: String,
        enum: ['buisness_day', 'calendar_day'],
        required: false
      },
      diraction: {
        type: String,
        enum: ['before', 'after'],
        required: false
      }
    },
    exist_task: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      required: false
    },
    matter: {
      type: Schema.Types.ObjectId,
      ref: 'Case',
      required: true
    }
},{
    timestamps:true
})

export const Task = mongoose.model<ITask,TaskModel>('Task', taskSchema);