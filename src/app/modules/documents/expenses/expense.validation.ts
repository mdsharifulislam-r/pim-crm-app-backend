import { z } from "zod";

const createExpenseZodSchema = z.object({
    body: z.object({
        case: z.string({
            required_error: "Case is required",
        }),
        type: z.string({
            required_error: "Type is required",
        }),
        amount: z.number({
            required_error: "Amount is required",
        }),
        date: z.string({
            required_error: "Date is required",
        }),
    }),

});

export const ExpenseValidation = {
    createExpenseZodSchema,
};