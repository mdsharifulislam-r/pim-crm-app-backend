import { z } from "zod";
import { PROVIDER_STATUS } from "../../../../enums/provider";

const createMedicalProviderZodSchema = z.object({
    body:z.object({
        case:z.string({
            required_error:"Case is required"
        }),
        providerName:z.string({
            required_error:"Provider name is required"
        }),
        description:z.string({
            required_error:"Description is required"
        }),
        first_treatment_date:z.string({
            required_error:"First treatment date is required"
        }),
        last_treatment_date:z.string({
            required_error:"Last treatment date is required"
        }),
        is_completed:z.boolean().optional().default(false),
        medical_record_request_date:z.string(),
        medical_record_follow_up_date:z.string(),
        medical_record_status:z.nativeEnum(PROVIDER_STATUS),
        isMedicalTask:z.boolean().optional(),
        medical_bill_request_date:z.string(),
        medical_bill_follow_up_date:z.string(),
        medical_bill_status:z.nativeEnum(PROVIDER_STATUS),
        isMedicalBillTask:z.boolean().optional().default(false)
        })
})

const updateMedicalProviderZodSchema = z.object({
    body:z.object({
        case:z.string().optional(),
        providerName:z.string().optional(),
        description:z.string().optional(),
        first_treatment_date:z.string().optional(),
        last_treatment_date:z.string().optional(),
        is_completed:z.boolean().optional(),
        medical_record_request_date:z.string().optional(),
        medical_record_follow_up_date:z.string().optional(),
        medical_record_status:z.nativeEnum(PROVIDER_STATUS).optional(),
        isMedicalTask:z.boolean().optional(),
        medical_bill_request_date:z.string().optional(),
        medical_bill_follow_up_date:z.string().optional(),
        medical_bill_status:z.nativeEnum(PROVIDER_STATUS).optional(),
        isMedicalBillTask:z.boolean().optional()
        })
})
export const ProviderValidation = {
    createMedicalProviderZodSchema,
    updateMedicalProviderZodSchema
}