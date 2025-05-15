import { JwtPayload } from "jsonwebtoken";
import { IPersonalInfo } from "./personal_info.interface";
import { PersonalInfo } from "./personal_info.model";
import { Case } from "../case/case.model";
import ApiError from "../../../errors/ApiErrors";
import { caseAuthorized } from "../../../util/caseAuthorized";

const createPersonalInfoIntoDB = async (data:IPersonalInfo,user:JwtPayload)=>{
    await caseAuthorized(data.case,user.id)
    const result = await PersonalInfo.create(data);
    return result;
}

const getPersonalInfosFromDB = async (caseId:string)=>{
    const result = await PersonalInfo.find({case:caseId}).lean()
    return result;
}

const updatePersonalInfoInDB = async (id:string,data:Partial<IPersonalInfo>,user:JwtPayload)=>{
    const personalInfo = await PersonalInfo.findById(id)
    if(!personalInfo){
        throw new ApiError(404,"Personal info not found")
    }
    await caseAuthorized(personalInfo.case,user.id)
    const result = await PersonalInfo.findOneAndUpdate({_id:id},{$set:data},{new:true})
    return result;
}
export const PersonalInfoService={
    createPersonalInfoIntoDB,
    getPersonalInfosFromDB,
    updatePersonalInfoInDB
}