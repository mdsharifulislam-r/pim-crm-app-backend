import mongoose from "mongoose";
import { DocumentModel, IDocument } from "./document.interface";
import { DOCUMENT_TYPE } from "../../../enums/document";

const fileSchenama = new mongoose.Schema({
    url:String,
    public_id:String
})
const documentSchema = new mongoose.Schema<IDocument,DocumentModel>({
    category: {
        type: String,
        enum: Object.values(DOCUMENT_TYPE),
        required: true
      },
      client: {
        type: mongoose.Schema.ObjectId,
        ref: 'Client',
        required: true
      },
      authorizer: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      },
      name: {
        type: String,
        required: true
      },
      assignedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      },
      assignedTo: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      },
      source_address: {
        type: String
      },
      source_email: {
        type: String,
      },
      source_phone: {
        type: String,
      },
      files: {
        type: [fileSchenama],
        required: true
      },
      comment: {
        type: String,
        required: false
      },
      total_expense: {
          type:Number,
          default:0
      },
      case_name: {
        type: mongoose.Schema.ObjectId,
        ref: 'Case',
        required: true
      },
       status:{
            type:String,
            enum:["active","deleted"],
            default:"active",
       }
}, {
  timestamps:true
})

export const Document = mongoose.model<IDocument,DocumentModel>('Document', documentSchema);