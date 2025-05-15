import { Model, Types } from "mongoose";
import { DOCUMENT_TYPE } from "../../../enums/document";

export type IDocument = {
    category: DOCUMENT_TYPE;
    client: Types.ObjectId;
    authorizer: Types.ObjectId;
    name: string;
    assignedBy: Types.ObjectId;
    assignedTo: Types.ObjectId;
    source_address?: string;
    source_email?:string;
    source_phone?:string;
    files:{
        url:string,
        public_id:string
    }[];
    comment?:string;
    total_expense:number;
    case_name:Types.ObjectId;
    status:"active"|"deleted"
}

export type DocumentModel = Model<IDocument>