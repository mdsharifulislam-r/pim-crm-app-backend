import { z } from "zod";
import { DAMAGE_TYPE } from "../../../../../enums/damage";

const createDamageZodSchema = z.object({
    body: z.object({
        type: z.nativeEnum(DAMAGE_TYPE),
        description: z.string({
            required_error: "Description is required",
        }),
        amount: z.number({
            required_error: "Amount is required",
        }),
        case: z.string({
            required_error: "Case is required",
        }),
        provider: z.string({
            required_error: "Provider is required",
        }),
    }),
});

export const DamageValidation = {
    createDamageZodSchema,
};