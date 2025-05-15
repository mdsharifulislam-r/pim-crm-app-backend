import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { getMultipleFilesPath } from "../../../shared/getFilePath";
import { DocumentService } from "./document.service";
import sendResponse from "../../../shared/sendResponse";

const uploadDocument = catchAsync(
    async(req:Request,res:Response)=>{
        const body = req.body;
        const user = req.user
        body.authorizer=user.id
        const files = getMultipleFilesPath(req.files)
        const result = await DocumentService.createDocument(body,files!);
        sendResponse(res,{
            statusCode:201,
            success:true,
            message:"document created successfully",
            data:result
        }) 
    }
)

const getAllDocuments=catchAsync(async(req:Request,res:Response)=>{
    const query=req.query;
    const result =await DocumentService.getDocuments(query);
    sendResponse(res,{
        statusCode:200,
        success:true,
        message:'documents fetched successfully',
        data:result.data,
        pagination:result.pagination
    })
}
)

const deleteDocument=catchAsync(async(req:Request,res:Response)=>{
    const id=req.params.id;
    const user = req.user
    const result =await DocumentService.deleteDocumentFromDB(id,user);
    sendResponse(res,{
        statusCode:200,
        success:true,
        message:'document deleted successfully',
        data:result
    })
}
)

const getSingleDocument=catchAsync(async(req:Request,res:Response)=>{
    const id=req.params.id;
    const result =await DocumentService.getSingleDocumentFromDB(id);
    sendResponse(res,{
        statusCode:200,
        success:true,
        message:'single document fetched successfully',
        data:result
    })
}
)

export const DocumentController={
    uploadDocument,
    getAllDocuments,
    deleteDocument,
    getSingleDocument
}