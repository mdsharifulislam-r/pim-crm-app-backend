import { Model, Types } from "mongoose";

export type IChannel = {
  name: string;
  creator:Types.ObjectId;
  participants:Types.ObjectId[];
  status: "active" | "inactive";
};
export type ChannelModel = Model<IChannel, Record<string, unknown>>;