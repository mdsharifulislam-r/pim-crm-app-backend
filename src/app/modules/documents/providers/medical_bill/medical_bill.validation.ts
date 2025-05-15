import { z } from "zod";

const createMedicalZodSchema = z.object({
    body: z.object({
        fileType: z.enum(["bill","record"],{
            required_error: "File type is required"
        }),
        provider: z.string({
            required_error: "Provider id is required"
        }),
        name: z.string({
            required_error: "Name is required"
        }),
        file: z.any(),
        bill_date: z.string({
            required_error: "Bill date is required"
        }),
        received_date: z.string({
            required_error: "Received date is required"
        }),
        bill_amount: z.string({
            required_error: "Bill amount is required"
        }),
        adjustment_amount: z.string({
            required_error: "Adjustment amount is required"
        }),
        owed_amount: z.string({
            required_error: "Owed amount is required"
        }),
        status: z.enum([
            "received",
            "incomplete"
            ], {
                required_error: "Status is required"
            }
        )
        }),

})

const createMedicalRecordZodSchema = z.object({
    body:  z.object({
        fileType: z.enum(["bill","record"],{
            required_error: "File type is required"
        }),
        provider: z.string({
            required_error: "Provider id is required"
        }),
        name: z.string({
            required_error: "Name is required"
        }),
        file: z.any(),
        bill_date: z.string({
            required_error: "Bill date is required"
        }),
        received_date: z.string({
            required_error: "Received date is required"
        }),
        
        record_start_date: z.string({
            required_error: "Record start date is required"
        }),
        record_end_date: z.string({
            required_error: "Record end date is required"
        }),
        status: z.enum([
            "received",
            "incomplete"
            ], {
                required_error: "Status is required"
            }
        )
        }),
})
export const MedicalValidation = {
    createMedicalZodSchema,
    createMedicalRecordZodSchema,
}