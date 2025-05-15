import { Request, Response } from "express";
import catchAsync from "../../../../../shared/catchAsync";
import { ProviderService } from "../provider.service";
import { DamagesService } from "./damages.service";
import sendResponse from "../../../../../shared/sendResponse";

const createDamage = catchAsync(async (req: Request, res: Response) => {
    const { ...damageData } = req.body;
    const user = req.user;
    const result = await DamagesService.createDamage(damageData, user);
    sendResponse(res, {
        statusCode:201,
        success: true,
        message: 'Damage created successfully',
        data: result,
    })
});

export const DamagesController = {
    createDamage,
};