import { z } from 'zod';
import { USER_ROLES } from '../../../enums/user';
import { TIME_ZONE } from '../../../enums/timeZone';
import { TeamRole } from '../../../enums/teamRole';

const teamZodValidationSchema = z.object({
    body: z.object({
        firstName: z.string({ required_error: 'First Name is required' }),
        lastName: z.string({ required_error: 'Last Name is required' }),
        title: z.string({ required_error: 'Title is required' }),
        email: z.string({ required_error: 'Email is required' }),
        phone: z.string({ required_error: 'Phone is required' }),
        role:z.nativeEnum(USER_ROLES),
        timezone: z.nativeEnum(TIME_ZONE),
        notify: z.boolean(),
        team_role:z.nativeEnum(TeamRole).optional()
    }),
});

export const TeamValidation = {
    teamZodValidationSchema,
};
