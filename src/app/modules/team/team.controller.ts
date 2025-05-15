import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TeamService } from './team.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { USER_ROLES } from '../../../enums/user';
import { join } from 'path';
import { getSingleFilePath } from '../../../shared/getFilePath';
import { cloudinaryHelper } from '../../../helpers/cloudinaryHelper';

const addTeamMember = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
    const result = await TeamService.createTeamMemberInDB({...req.body, authorizer: req.user.id});

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Team member added successfully',
        data: result
    });
});

const retrieveTeamMember = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const result = await TeamService.retrievedTeamMemberFromDB(id, req.query);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Team member retrieved successfully',
        data: result
    });
});

const updateTeamMember = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
    const result = await TeamService.updateTeamMemberInDB(req.params.id, req.body);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Team member updated successfully',
        data: result
    });
});

const deleteTeamMember = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
    await TeamService.deleteTeamMemberFromDB(req.params.id);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Team member deleted successfully'
    });
});

const getTeams = catchAsync(
    async (req:Request,res:Response)=>{
        const result = await TeamService.retrieveTeams()
        sendResponse(res,{
            success:true,
            statusCode:StatusCodes.OK,
            message:'teams retrieved successfully',
            data:result
        })
    }
)

export const TeamController = { 
    addTeamMember, 
    retrieveTeamMember, 
    updateTeamMember, 
    deleteTeamMember ,
    getTeams
};