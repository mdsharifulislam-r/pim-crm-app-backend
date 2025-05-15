import { Model, Types } from "mongoose"

export type IEvidence = {
    case:Types.ObjectId,
    file:{
        url:string,
        public_id:string
    },
    description:string
}

export type EvidenceModel = Model<IEvidence>