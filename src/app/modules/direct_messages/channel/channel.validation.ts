import { z } from "zod";

const createChannelZodSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Name is required' }),
        participants: z.array(z.string({ required_error: 'Participant is required' })).optional()
    })
})

const updateChannelZodSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Name is required' }).optional(),
        participants: z.array(z.string({ required_error: 'Participant is required' })).optional(),
    })
})

const addTeamMemberZodSchema = z.object({
    body: z.object({
        userId: z.string({ required_error: 'User id is required' }),
    })
})
export const ChannelValidation = {
    createChannelZodSchema,
    updateChannelZodSchema,
    addTeamMemberZodSchema
}