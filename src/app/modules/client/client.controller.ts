import { Request, Response, NextFunction } from 'express';
import { ClientService } from './client.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createClient = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const client = await ClientService.createClientInDB(req.body);
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
    const client = await ClientService.deleteClientFromDB(req.params.id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Client deleted successfully',
        data: client
    });
});


export const ClientController = {
    createClient,
    retrieveClients,
    deleteClient
};