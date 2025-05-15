import { z } from "zod";
import { CASE_LOCATION, MATTER_STAGE, PRACTICE_AREA } from "../../../enums/case";

const createCaseZodSchema = z.object({
    body:z.object({
        client: z.string({ required_error: "Client is required" }),
        description: z.string({ required_error: "Description is required" }),
        status: z.enum(["open", "closed"]),
        responsible_attorney: z.string({ required_error: "Responsible attorney is required" }),
        origianing_attorney: z.string({ required_error: "Originating attorney is required" }),
        client_refference_number: z.string().optional(),
        location: z.nativeEnum(CASE_LOCATION), // Replace with actual CASE_LOCATION values
        practice_area: z.nativeEnum(PRACTICE_AREA), // Replace with PRACTICE_AREA values
        matter_stage: z.nativeEnum(MATTER_STAGE), // Replace with MATTER_STAGE values
        matter_type: z.enum(["open", "closed"]),
        open_date: z.string(),
        close_date: z.string().optional(),
        pending_date: z.string().optional(),
        matter_permission: z.enum(["everyone", "group"]),
        group_user: z.array(z.string()).optional(),
        matter_notification_user: z.array(z.string()).optional(),
        block_user: z.array(z.string()).optional(),
        realeted_contact: z.string().optional(),
        realeted_contact_relation: z.string().optional(),
        bill: z.enum(['recipient', 'other']),
        custom_fields: z.array(z.string()),
        billing_method: z.enum(['hourly', 'contingency']),
        balance_notification: z.boolean().optional(),
        recipient: z.string().optional(),
        billing_rate: z.number().optional(),
        deduct_expenses_first: z.boolean().optional(),
        task_list: z.array(z.string()).optional(),
        folder_name: z.string(),
        folder_category: z.string(),
        originating_attorney_allocation: z.number(),
        responsible_attorney_allocation: z.number(),
        use_firm_settings: z.boolean()
      })
})

const updateCaseZodSchema = z.object({
    body:z.object({
        client: z.string().optional(),
        description: z.string().optional(),
        status: z.enum(["open", "closed"]).optional(),
        responsible_attorney: z.string().optional(),
        origianing_attorney: z.string().optional(),
        client_refference_number: z.string().optional(),
        location: z.nativeEnum(CASE_LOCATION).optional(),
        practice_area: z.nativeEnum(PRACTICE_AREA).optional(),
        matter_stage: z.nativeEnum(MATTER_STAGE).optional(),
        matter_type: z.enum(["open", "closed"]).optional(),
        open_date: z.string().optional(),
        close_date: z.string().optional(),
        pending_date: z.string().optional(),
        matter_permission: z.enum(["everyone", "group"]).optional(),
        group_user: z.array(z.string()).optional(),
        matter_notification_user: z.array(z.string()).optional(),
        block_user: z.array(z.string()).optional(),
        realeted_contact: z.string().optional(),
        realeted_contact_relation: z.string().optional(),
        bill: z.enum(['recipient', 'other']).optional(),
        custom_fields: z.array(z.string()).optional(),
        billing_method: z.enum(['hourly', 'contingency']).optional(),
        balance_notification: z.boolean().optional(),
        recipient: z.string().optional(),
        billing_rate: z.number().optional(),
        deduct_expenses_first: z.boolean().optional(),
        task_list: z.array(z.string()).optional(),
        folder_name: z.string().optional(),
        folder_category: z.string().optional(),
        originating_attorney_allocation: z.number().optional(),
        responsible_attorney_allocation: z.number().optional(),
        use_firm_settings: z.boolean().optional(),
      })
})

const manageProvidersZodSchema = z.object({
    body:z.object({
        providers: z.array(z.string())
    })
})

export const CaseValidation = {
    createCaseZodSchema,
    updateCaseZodSchema,
    manageProvidersZodSchema
}