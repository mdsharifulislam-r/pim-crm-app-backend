import { Types } from "mongoose";

export type IDocument = {
    _id?: Types.ObjectId;
    category: Types.ObjectId;
    client: Types.ObjectId;
    authorizer: Types.ObjectId;
    date: Date;
    description: string;
    file: string;
}