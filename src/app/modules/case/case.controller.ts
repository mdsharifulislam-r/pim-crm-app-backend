import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { CaseService } from "./case.service";
import sendResponse from "../../../shared/sendResponse";

const createCase = catchAsync(
    async (req:Request, res:Response) => {
        const user = req.user;
        const result = await CaseService.createCaseToDB({...req.body,authorizer:user.id})
        sendResponse(res,{
            statusCode:201,
            success:true,
            message:'Case created successfully',
            data:result
        })
    }
)

const getAllCases=catchAsync(async(req:Request,res:Response)=>{
    const query=req.query;
    const result =await CaseService.getAllCasesFromDB(query);
    sendResponse(res,{
        statusCode:200,
        success:true,
        message:"All cases fetched",
        data:result
    })
}
)

const updateCase=catchAsync(async(req:Request,res:Response)=>{
    const id=req.params.id;
    const payload=req.body;
    const user = req.user;
    const result = await CaseService.updateCaseById(id,payload,user)
    sendResponse(res,{
        statusCode:200,
        success:true,
        message:"Case updated successfully",
        data:result
    })
})

const getOverviewOfCases=catchAsync(async(req:Request,res:Response)=>{
    const result = await CaseService.overViewofCases();
    sendResponse(res,{
        statusCode:200,
        success:true,
        message:"Overview of all cases fetched",
        data:result
    })
}
)

const manageProviders = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;
    const user = req.user;
    const result = await CaseService.addProviderIntoDB(id, payload.providers, user);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Case managed successfully',
      data: result
    })
})

const documentPreview = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await CaseService.getCaseDocumentPreview(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Document preview fetched successfully',
      data: result
    })
})

export const CaseController={
    createCase,
    getAllCases,
    updateCase,
    getOverviewOfCases,
    manageProviders,
    documentPreview
}