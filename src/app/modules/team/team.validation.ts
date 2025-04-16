import { z } from 'zod';

export const teamZodValidationSchema = z.object({
    body: z.object({
        firstName: z.string({ required_error: 'First Name is required' }),
        lastName: z.string({ required_error: 'Last Name is required' }),
        title: z.string({ required_error: 'Title is required' }),
        email: z.string({ required_error: 'Email is required' }),
        phone: z.string({ required_error: 'Phone is required' }),
        password: z.string({ required_error: 'Password is required' }),
        permissions: z.array(z.string()).min(1, { message: 'Permissions is required' }),
        timezones: z.string({ required_error: 'Timezones is required' }),
    }),
});
