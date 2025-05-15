import { Request, Response, NextFunction } from 'express';
import { ClientService } from './contact.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { getSingleFilePath } from '../../../shared/getFilePath';
import { cloudinaryHelper } from '../../../helpers/cloudinaryHelper';

const createClient = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const filePath = getSingleFilePath(req.files,'profile')
    const cloud_url =await cloudinaryHelper.uploadFile(filePath)
    
    const { id } = req.user;
    
    const client = await ClientService.createClientInDB({...req.body,profile:{
        url:cloud_url?.url||"",
        public_id:cloud_url?.public_id||""
    },authorizer:id});
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Client created successfully',
        data: client
    });
});

const retrieveClients = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const clients = await ClientService.retrieveClientsFromDB(req.user, req.query);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Clients retrieved successfully',
        data: clients
    });
});

const deleteClient = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const client = await ClientService.deleteClientFromDB(req.params.id,user);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Client deleted successfully',
        data: client
    });
});

const getClient = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const client = await ClientService.getClientFromDB(req.params.id!);
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Client retrieved successfully',
            data: client
        })
    }
)

export const ClientController = {
    createClient,
    retrieveClients,
    deleteClient,
    getClient
};