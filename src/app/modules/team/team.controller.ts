import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TeamService } from './team.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { USER_ROLES } from '../../../enums/user';

const addTeamMember = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
    const result = await TeamService.createTeamMemberInDB({...req.body, role: USER_ROLES.TEAM, verified: true, authorizer: req.user.id});

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Team member added successfully',
        data: result
    });
});

const retrieveTeamMember = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
    const result = await TeamService.retrievedTeamMemberFromDB(req.user, req.query);

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

export const TeamController = { 
    addTeamMember, 
    retrieveTeamMember, 
    updateTeamMember, 
    deleteTeamMember 
};