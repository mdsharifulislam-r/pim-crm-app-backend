import { z } from "zod";

const createPersonalInfoZodSchema = z.object({
    body:z.object({
        name: z.string({ required_error: "Name is required" }),
        date_of_birth: z.string(),
        email: z.string().email({ message: "Invalid email address" }),
        phone_numbers: z.array(z.string()),
        social_security_number: z.string(),
        case: z.string({ required_error: "Case ID is required" }) 
      })
})

const updatePersonalInfoZodSchema = z.object({
    body:z.object({
        name: z.string().optional(),
        date_of_birth: z.string().optional(),
        email: z.string().email({ message: "Invalid email address" }).optional(),
        phone_numbers: z.array(z.string()).optional(),
        social_security_number: z.string().optional(),
        case: z.string().optional() 
    })
})

export const PersonalInfoValidation={
    createPersonalInfoZodSchema,
    updatePersonalInfoZodSchema
}