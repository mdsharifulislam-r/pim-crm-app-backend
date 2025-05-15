import { z } from "zod";

const createNoteZodSchema = z.object({
    body: z.object({
        discription: z.string({ required_error: 'Discription is required' }),
        type: z.enum(['case', 'inbox'], { required_error: 'Type is required' }),
        provider: z.string({ required_error: 'Provider is required' }),
    })
});

export const NoteValidation = {
    createNoteZodSchema
}