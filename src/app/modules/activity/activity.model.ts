import { model, Schema } from "mongoose";
import { ActivityModel, IActivity } from "./activity.interface";
import { ACTIVITY_STATUS } from "../../../enums/activity";

const activitySchema = new Schema<IActivity, ActivityModel>(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ACTIVITY_STATUS),
      default: ACTIVITY_STATUS.INFO,
    },
    todos: [
      {
        title: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: false,
          default:new Date(),
        },
        status: {
          type: String,
          enum: Object.values(ACTIVITY_STATUS),
          default: ACTIVITY_STATUS.INFO,
        },
      },
    ],
    for: {
      type: String,
      enum: ["global","chat"],
      default: "global",
    },
    chatId: {
      type: Schema.Types.ObjectId,
      required:false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required:false
  }
},
  {
    timestamps: true,
  }
);

export const Activity = model<IActivity, ActivityModel>('Activity', activitySchema);