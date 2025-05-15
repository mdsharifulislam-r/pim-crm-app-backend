import { z } from "zod";
import { TASK_PRIORITY, TASK_STATUS, TASK_TYPE } from "../../../enums/task";
import { Types } from "mongoose";
const objectId = z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId'
  });
const createTaskZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Task name is required' }),
    description: z.string().optional(),
    priority: z.nativeEnum(TASK_PRIORITY, {
      required_error: 'Priority is required'
    }),
    task_status: z.nativeEnum(TASK_STATUS).optional(),
    assign_to: objectId,
    private: z.boolean().optional(),
    task_estimate_time: z.string({ required_error: 'Task estimate time is required' }),
    task_type: z.nativeEnum(TASK_TYPE, {
      required_error: 'Task type is required'
    }),
    standard_due_date: z.coerce.date().optional(),
    relative_due_date: z
      .object({
        due_date: z.number(),
        days: z.enum(['buisness_day', 'calendar_day']),
        diraction: z.enum(['before', 'after'])
      })
      .optional(),
    exist_task: objectId.optional(),
    matter: objectId.optional()
  })
}
)

const updateTaskZodSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        priority: z.nativeEnum(TASK_PRIORITY).optional(),

    }
    )
})

const changeTaskStatusZodSchema = z.object({
    body: z.object({
        status: z.nativeEnum(TASK_STATUS)
    }
    )
})
export const TaskValidation = {
  createTaskZodSchema,

  updateTaskZodSchema,
  changeTaskStatusZodSchema
};