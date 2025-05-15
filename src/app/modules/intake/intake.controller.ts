import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { IntakeService } from "./intake.service";
import sendResponse from "../../../shared/sendResponse";

const createIntake = catchAsync(
    async (req:Request, res:Response) => {
        const user = req.user;
        const result = await IntakeService.createIntakeWithId(req.body)
        sendResponse(res,{
            statusCode:201,
            success:true,
            message:'Intake created successfully',
            data:result
        })
    }
)

const getAllIntakes = catchAsync(async (req:Request,res:Response)=>{
    const {client,caseId}=req.query 
    const result=await IntakeService.getIntakes(client as string, caseId as string)
    sendResponse(res,{
        statusCode:200,
        success:true,
        message:"All intakes retrieved",
        data:result
    })
}
)

export const IntakeController={
    createIntake,
    getAllIntakes
}