import { z } from "zod";

const createEvidenceZodSchema = z.object({
    body:z.object({
        case:z.string({
            required_error:"Case is required"
        }),
        file:z.any(),
        description:z.string({
            required_error:"Description is required"
        })
    })
})


export const EvidenceValidation = {
    createEvidenceZodSchema
}