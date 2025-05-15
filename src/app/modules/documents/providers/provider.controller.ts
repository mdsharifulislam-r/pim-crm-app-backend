import { Request, Response } from "express";
import catchAsync from "../../../../shared/catchAsync";
import { ProviderService } from "./provider.service";
import sendResponse from "../../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createProvider = catchAsync(async (req: Request, res: Response) => {
    const { ...providerData } = req.body;
    const user = req.user;
    const result = await ProviderService.createMedicalProvider(providerData,user);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Provider created successfully',
        data: result,
      })
})

const getProviders = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.query;
    const user = req.user;
    const query = req.query;
    const result = await ProviderService.getMedicalProviders(id as string,query);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Providers fetched successfully',
        data: result.data,
        pagination: result.pagination,
      })
})

const updateProvider = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...providerData } = req.body;
    const user = req.user;
    const result = await ProviderService.updateProvider(id,providerData,user);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Provider updated successfully',
        data: result,
      })
})
export const ProviderController = {
    createProvider,
    getProviders,
    updateProvider,
}