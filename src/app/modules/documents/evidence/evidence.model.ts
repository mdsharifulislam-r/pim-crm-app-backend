import mongoose from "mongoose";
import { EvidenceModel, IEvidence } from "./evidence.interface";

const evidenceSchema = new mongoose.Schema<IEvidence,EvidenceModel>({
    case:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Case"
    },
    file:{
        url:{
            type:String,
            required:true
        },
        public_id:{
            type:String,
            required:true
        }
    },
    description:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

export const Evidence = mongoose.model<IEvidence,EvidenceModel>("Evidence",evidenceSchema);