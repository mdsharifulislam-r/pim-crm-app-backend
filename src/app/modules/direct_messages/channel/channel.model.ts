import { model, Schema } from "mongoose";
import { ChannelModel, IChannel } from "./chennel.interface";

const  channelSchema = new Schema<IChannel, ChannelModel>(
  {
    name: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

export const Channel = model<IChannel, ChannelModel>('Channel', channelSchema);