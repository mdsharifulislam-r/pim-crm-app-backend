import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ActivityService } from "./activity.service";
import { StatusCodes } from "http-status-codes";

const getAllActivities = catchAsync(async (req: Request, res: Response) => {
    const activities = await ActivityService.retrieveActivitiesFromDB(req.query);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Activities retrieved successfully',
        data: activities.activities,
        pagination: activities.pagination
    });
});
export const ActivityController = {
    getAllActivities
};