import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { InsuranceService } from "./insurance.service";
import sendResponse from "../../../shared/sendResponse";

const createInsurance = catchAsync(
    async (req:Request,res:Response)=>{
        const user =req.user;
        const result=await InsuranceService.createInsuranceIntoDB(req.body,user);
        sendResponse(res,{
            statusCode:201,
            success:true,
            message:"Insurance created successfully",
            data:result,
        }
        )
    }
)

const getAllInsurances =catchAsync(async(req:Request,res:Response)=>{
    const caseId =req.params.id
    const queryParams=req.query;
    const result= await InsuranceService.getInsuranceFromDB(caseId,queryParams);
    sendResponse(res,{
        statusCode:200,
        success:true,
        message:"Insurance fetched successfully",
        data:result
    })
}
)

const updateInsurance = catchAsync(
    async (req:Request,res:Response)=>{
        const id=req.params.id;
        const user =req.user;
        const result=await InsuranceService.updateInsuranceInDB(id,req.body,user);
        sendResponse(res,{
            statusCode:201,
            success:true,
            message:"Insurance updated successfully",
            data:result,
        }
        )
    }
)

export const InsuranceController={
    createInsurance,
    getAllInsurances,
    updateInsurance,
}