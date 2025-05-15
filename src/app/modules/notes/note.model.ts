import { model, Schema } from "mongoose";
import { INote, NoteModel } from "./note.interface";

const noteSchema = new Schema<INote, NoteModel>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        discription: { type: String, required: true },
        type: {
            type: String,
            enum: ['case', 'inbox'],
            required: true
        },
        provider: { type: Schema.Types.ObjectId, required: true },
    },
    { timestamps: true }
);
export const Note = model<INote, NoteModel>('Note', noteSchema);