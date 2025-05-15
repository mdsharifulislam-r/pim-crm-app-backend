import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../../errors/ApiErrors";
import { cloudinaryHelper } from "../../../../helpers/cloudinaryHelper";
import QueryBuilder from "../../../query/QueryBuilder";
import { IEvidence } from "./evidence.interface";
import { Evidence } from "./evidence.model";
import { caseAuthorized } from "../../../../util/caseAuthorized";

const createEvidenceToDB = async (payload:IEvidence,user:JwtPayload):Promise<IEvidence|null> => {
    await caseAuthorized(payload.case,user.id);
    const data = await cloudinaryHelper.caseUploadFile(payload.file as any,payload.case)
    payload.file = data;
    const result = await Evidence.create(payload);
    if(!result) throw new ApiError(400,"Failed to create evidence");
    return result;
}
const getAllEvidenceFromDB = async (caseId:string,query:Record<string,any>) => {
    const result = new QueryBuilder(Evidence.find({case:caseId}),query).search(['description']).sort().paginate()
    const paginationInfo = await result.getPaginationInfo()
    const data = await result.modelQuery.lean()
    return {
        data,
        paginationInfo
    }
}

const deleteEvidenceFromDB = async (id:string) => {
    const evidence = await Evidence.findById(id);
    if(!evidence) throw new ApiError(400,"Evidence not found");
    if(evidence.file.public_id){
        await cloudinaryHelper.deleteFile(evidence.file.public_id);
    }
    const result = await Evidence.findByIdAndDelete(id);
    if(!result) throw new ApiError(400,"Failed to delete evidence");
    return result;
}

export const EvidenceService = {
    createEvidenceToDB,
    getAllEvidenceFromDB,
    deleteEvidenceFromDB
}