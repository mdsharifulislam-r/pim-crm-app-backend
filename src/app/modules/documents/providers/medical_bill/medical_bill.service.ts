import { JwtPayload } from "jsonwebtoken";
import { IMedicalBill } from "./medical_bill.interface";
import { MedicalBill } from "./medical_bill.model";
import { Provider } from "../provider.model";
import { caseAuthorized } from "../../../../../util/caseAuthorized";
import { cloudinaryHelper } from "../../../../../helpers/cloudinaryHelper";
import QueryBuilder from "../../../../query/QueryBuilder";

const createMedicalBillToDB = async (data:IMedicalBill,user:JwtPayload) => {
    const existProvider = await Provider.findById(data.provider);
    if(!existProvider){
        throw new Error("Invalid provider id");
    }
    await caseAuthorized(existProvider.case,user.id);
    const fileUrl= await cloudinaryHelper.caseUploadFile(data.filePath as any,existProvider.case);
    data.filePath=fileUrl;
    data.authorizer=user.id;
    data.case=existProvider.case;
    const medicalBill = await MedicalBill.create(data);
    return medicalBill;
}

const deleteMedicalBillFromDB = async (id:string,user:JwtPayload) => {
    const medicalBill = await MedicalBill.findById(id);
    if(!medicalBill){
        throw new Error("Invalid medical bill id");
    }
    const existProvider = await Provider.findById(medicalBill.provider);
    if(!existProvider){
        throw new Error("Invalid provider id");
    }
   await caseAuthorized(existProvider.case,user.id);
    await cloudinaryHelper.deleteFile(medicalBill.filePath.public_id);
    await MedicalBill.findByIdAndDelete(id);
    return true;
}

const getAllMedicalRecordsOfCase = async (caseId:string,query:Record<string,any>) => {
    const result = new QueryBuilder(MedicalBill.find({case:caseId,fileType:"record"}),query).sort().paginate().search(['name'])
    const paginationInfo = await result.getPaginationInfo()
    const data = await result.modelQuery.lean()
    return {
        paginationInfo,
        data
    }
}

export const MedicalBillService={
    createMedicalBillToDB,
    deleteMedicalBillFromDB,
    getAllMedicalRecordsOfCase
}