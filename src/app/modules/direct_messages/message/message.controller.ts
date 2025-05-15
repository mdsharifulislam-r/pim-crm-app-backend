import { Request, Response } from "express";
import catchAsync from "../../../../shared/catchAsync";
import { MessageService } from "./message.service";
import sendResponse from "../../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { getSingleFilePath } from "../../../../shared/getFilePath";

const createMessage = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = req.user;
  const image = getSingleFilePath(req.files)
  if (image) {
    payload.file = image;
  }

  
  const result = await MessageService.createMessageToDB(payload, user);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Message created successfully',
    data: result,
  });
});

const retriveMessages = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const query = req.query;
  const result = await MessageService.retriveMessagesFromDB(id, query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Messages retrieved successfully',
    data: result.messages,
    pagination: result.paginationInfo,
  });
});

export const MessageController = {
  createMessage,
  retriveMessages,
};