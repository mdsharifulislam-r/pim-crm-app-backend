import { Request, Response } from "express";
import catchAsync from "../../../../shared/catchAsync";
import sendResponse from "../../../../shared/sendResponse";
import { EvidenceService } from "./evidence.service";
import { getSingleFilePath } from "../../../../shared/getFilePath";

const createEvidence = catchAsync(async (req:Request,res:Response) => {
    const payload = req.body;
    const user = req.user;
    const file = getSingleFilePath(req.files)
    payload.file = file;
    const result = await EvidenceService.createEvidenceToDB({...payload},user);
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Evidence created successfully",
        data:result
    })
})

const getAllEvidence = catchAsync(async (req:Request,res:Response) => {
    const query = req.query;
    const result = await EvidenceService.getAllEvidenceFromDB(req.query.id as string,query);
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Evidence fetched successfully",
        data:result
    })
})

export const EvidenceController = {
    createEvidence,
    getAllEvidence
}