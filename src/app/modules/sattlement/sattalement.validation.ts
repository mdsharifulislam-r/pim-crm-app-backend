import { z } from "zod";

const createRecoveryZodSchema = z.object({
    body:z.object({
        source: z.string({ required_error: 'Source is required' }),
        amount: z.number({ required_error: 'Amount is required' }),
        case: z.string({ required_error: 'Case is required' }),
    })
})

const createLegalFeeZodSchema = z.object({
    body:z.object({
        source: z.string({ required_error: 'Source is required' }),
        case: z.string({ required_error: 'Case is required' }),
        orginal_amount: z.number({ required_error: 'Total amount is required' }),
        rate: z.number({ required_error: 'Rate is required' }),
        discount: z.number({ required_error: 'Discount is required' }),
        reciept: z.string({ required_error: 'Reciept is required' }),
    })
})

export const SattlementValidation = {
    createRecoveryZodSchema,
    createLegalFeeZodSchema
}
