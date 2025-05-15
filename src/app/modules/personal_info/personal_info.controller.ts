import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { PersonalInfoService } from "./personal_info.service";
import sendResponse from "../../../shared/sendResponse";

const createPersonalInfo = catchAsync(
    async (req:Request,res:Response)=>{
        const userId=req.user;
        const result=await PersonalInfoService.createPersonalInfoIntoDB(req.body,userId)
        sendResponse(res,{
            statusCode:201,
            success:true,
            message:"Personal Info created successfully",
            data:result
        })
    }
)

const updatePersonalInfo = catchAsync(
    async (req:Request,res:Response)=>{
        const id=req.params.id;
        const updatedData=req.body;
        const userId=req.user;
        const result=await PersonalInfoService.updatePersonalInfoInDB(id,updatedData,userId);
        sendResponse(res,{
            statusCode:200,
            success:true,
            message:"Personal Info Updated Successfully",
            data:result
        })
    }
)
const getPersonalInfo = catchAsync(
    async (req:Request,res:Response)=>{
        const caseId = req.params.id
        const result=await PersonalInfoService.getPersonalInfosFromDB(caseId);
        sendResponse(res,{
            statusCode:200,
            success:true,
            message:"Personal Info fetched successfully",
            data:result
        })
    }
)
export const PersonalInfoController={
    createPersonalInfo,
    updatePersonalInfo,
    getPersonalInfo
}