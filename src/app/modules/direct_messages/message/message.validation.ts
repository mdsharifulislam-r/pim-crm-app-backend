import { z } from "zod";

const createMessageZodSchema = z.object({
    body: z.object({
        content: z.string().optional(),
        file: z.any().optional(),
        channel: z.string().optional(),
    }),
});

export const MessageValidation = {
    createMessageZodSchema,
};