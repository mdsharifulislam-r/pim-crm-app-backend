import { Request, Response } from "express";
import catchAsync from "../../../../../shared/catchAsync";
import { MedicalBillService } from "./medical_bill.service";
import sendResponse from "../../../../../shared/sendResponse";
import { getSingleFilePath } from "../../../../../shared/getFilePath";

const createMedicalBill = catchAsync(async (req:Request,res:Response)=>{
    const {user} = req;
    const data = req.body;
    const file = getSingleFilePath(req.files)
    data.filePath = file;
    console.log(file);
    const medicalBill = await MedicalBillService.createMedicalBillToDB(data,user);
    sendResponse(res,{
        statusCode:200,
        success:true,
        message:"Medical bill created successfully",
        data:medicalBill
    })
})

const deleteMedicalBill = catchAsync(async (req:Request,res:Response)=>{
    const {user} = req;
    const {id} = req.params;
    const medicalBill = await MedicalBillService.deleteMedicalBillFromDB(id,user);
    sendResponse(res,{
        statusCode:200,
        success:true,
        message:"Medical bill deleted successfully",
        data:medicalBill
    })
})

const getAllMedicalRecordsOfCase = catchAsync(async (req:Request,res:Response)=>{
    const {id} = req.params;
    const query = req.query;
    const medicalBills = await MedicalBillService.getAllMedicalRecordsOfCase(id,query);
    sendResponse(res,{
        statusCode:200,
        success:true,
        message:"Medical bills fetched successfully",
        data:medicalBills
    })
})

export const MedicalBillController = {
    createMedicalBill,
    deleteMedicalBill,
    getAllMedicalRecordsOfCase
}
