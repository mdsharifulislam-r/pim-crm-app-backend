import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { INote } from "./note.interface";
import { Note } from "./note.model";
import QueryBuilder from "../../query/QueryBuilder";

const createNoteToDB = async (payload: INote): Promise<INote> => {
    const note = await Note.create(payload);
    if (!note)
        throw new ApiError(StatusCodes.EXPECTATION_FAILED, 'Failed to create note');
    return note;
    };

const retrieveNotesFromDB = async (provider: string, query: Record<string, any>) => {
    const noteQuery = new QueryBuilder(
        Note.find({provider:provider}),
        query
    ).search(['discription']).sort().paginate()
    const notes = await noteQuery.modelQuery.populate('user','firstName lastName image email').lean().exec()
    const pagination = await noteQuery.getPaginationInfo();
    return {notes,pagination}
    };


export const NoteService = {
    createNoteToDB,
    retrieveNotesFromDB
}