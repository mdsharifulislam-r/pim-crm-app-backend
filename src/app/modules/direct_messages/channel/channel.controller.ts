import { Request, Response } from "express";
import catchAsync from "../../../../shared/catchAsync";
import { ChannelService } from "./channel.service";
import sendResponse from "../../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createChannel = catchAsync(async (req: Request, res: Response) => {
    const user= req.user;
    const channel = await ChannelService.createChannelToDB(req.body,user);
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Channel created successfully',
        data: channel
    });
});

const retrieveChannels = catchAsync(async (req: Request, res: Response) => {
    const user= req.user;
    const channels = await ChannelService.retrieveChannelsFromDB(req.query,user);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Channels retrieved successfully',
        data: channels.channels,
        pagination: channels.pagination
    });
});

const updateChannel = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const channel = await ChannelService.updateChannelToDB(id, req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Channel updated successfully',
        data: channel
    });
});
const deleteChannel = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const channel = await ChannelService.deleteChannelFromDB(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Channel deleted successfully',
        data: channel
    });
});

const addTeamMember = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req.body;
    const user= req.user;
    const channel = await ChannelService.addMemberToChannel(id, userId,user);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Member added to channel successfully',
        data: channel
    });
});
export const ChannelController = {
    createChannel,
    retrieveChannels,
    updateChannel,
    deleteChannel,
    addTeamMember
}