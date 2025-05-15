import { z } from "zod";
import { DOCUMENT_TYPE } from "../../../enums/document";

const createDocumentZodSchema = z.object({
    body:z.object({
        category: z.nativeEnum(DOCUMENT_TYPE),
        client: z.string(),
        name: z.string({ required_error: 'Name is required' }),
        assignedBy: z.string(),
        assignedTo: z.string(),
        source_address: z.string().optional(),
        source_email: z.string().email('Invalid email').optional(),
        source_phone: z.string().optional(),
        file: z.any(),
        comment: z.string().optional(),
        total_expense: z.string().min(0),
        case_name: z.string(),
      })
})

export const DocumentValidation = {
  createDocumentZodSchema
}