import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { NoteService } from "./note.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createNote = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.user;
    const note = await NoteService.createNoteToDB({ ...req.body, user: id });
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Note created successfully',
        data: note
    });
});

const retrieveNotes = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.query;
    const notes = await NoteService.retrieveNotesFromDB(id as string, req.query);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Notes retrieved successfully',
        data: notes.notes,
        pagination: notes.pagination
    });
});

export const NoteController = {
    createNote,
    retrieveNotes
}