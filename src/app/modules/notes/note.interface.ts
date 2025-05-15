import { Model, Types } from "mongoose";

export type INote = {
    user: Types.ObjectId;
    discription: string;
    type:"case"|"inbox",
    provider: Types.ObjectId;
};

export type NoteModel = Model<INote>;