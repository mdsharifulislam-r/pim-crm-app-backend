import { JwtPayload } from "jsonwebtoken";
import { IInsruance } from "./insurance.inerface";
import { caseAuthorized } from "../../../util/caseAuthorized";
import { Insurance } from "./insurance.model";
import QueryBuilder from "../../query/QueryBuilder";

const createInsuranceIntoDB = async (data:IInsruance,user:JwtPayload)=>{
    await caseAuthorized(data.case as any,user.id)

    const result = await Insurance.create(data)

    return result
}

const getInsuranceFromDB = async (caseId:any,query:Record<string,any>)=>{
    const result =  new QueryBuilder(Insurance.find({case:caseId}),query).sort().filter()
    const insurances = await result.modelQuery.lean()
    return insurances
}

const updateInsuranceInDB = async (id:any,data:Partial<IInsruance>,user:JwtPayload)=>{
    const insurance = await Insurance.findOne({_id:id})
    if(!insurance){
        throw new Error("Insurance not found")
    }
    await caseAuthorized(insurance.case,user.id)
    const result = await Insurance.updateOne({_id:id},{$set:data},{new:true})
    return result
}

export const InsuranceService={
    createInsuranceIntoDB,
    getInsuranceFromDB,
    updateInsuranceInDB
}