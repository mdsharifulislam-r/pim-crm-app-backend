import { z } from 'zod';
import { IClientType } from '../../../enums/client';

export const clientZodValidationSchema = z.object({
    body: z.object({
        type: z.enum(Object.values(IClientType) as [IClientType, ...IClientType[]], { required_error: 'Type is required' }),
        name: z.string({ required_error: 'Name is required' }),
        email: z.string({ required_error: 'Email is required' }),
        phone: z.string({ required_error: 'Phone is required' }),
        address: z.string({ required_error: 'Address is required' }),
        country: z.string({ required_error: 'Country is required' }),
        city: z.string({ required_error: 'City is required' }),
        tags: z.array(z.string()).min(1, { message: 'Tags is required' }),
        file: z.array(z.string()).min(1, { message: 'File is required' })
    })
});