import { z } from "zod";

const createInsuranceZodSchema = z.object({
  body: z.object({
    type: z.enum(["auto", "health"]),
    insurance_provider: z.string().optional(),
    policy_number: z.string().optional(),
    adjuster: z.string().optional(),
    policy_holder: z.string().optional(),
    email: z.string({ required_error: "Email is required" }).email("Invalid email format"),
    phone: z.string({ required_error: "Phone number is required" }),
    note: z.string().optional(),
    case: z.string({ required_error: "Case ID is required" }) // assuming ObjectId is string
  })
})

const updateInsuranceZodSchema = z.object({
    body:  z.object({
        type: z.enum(["auto", "health"]).optional(),
        insurance_provider: z.string().optional(),
        policy_number: z.string().optional(),
        adjuster: z.string().optional(),
        policy_holder: z.string().optional(),
        email: z.string().email("Invalid email format").optional(),
        phone: z.string().optional(),
        note: z.string().optional(),
        case: z.string().optional()
      })
})

export const InsuranceValidation = {
    createInsuranceZodSchema,
    updateInsuranceZodSchema
}