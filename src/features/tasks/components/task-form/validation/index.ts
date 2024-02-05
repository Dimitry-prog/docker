import { z } from 'zod';

export const taskFormSchema = z.object({
  title: z.string().min(1, { message: 'Название слишком короткое' }),
  starting_date: z.coerce
    .number({
      invalid_type_error: 'Заполните поле',
    })
    .optional(),
  deadline: z.coerce
    .number({
      invalid_type_error: 'Заполните поле',
    })
    .optional(),
  type_id: z
    .object({
      value: z.string(),
      id: z.number(),
    })
    .optional(),
  status_id: z.object(
    {
      value: z.string().min(1, { message: 'Выберите статус' }),
      id: z.number().min(1, { message: 'Выберите статус' }),
    },
    { required_error: 'Выберите статус', invalid_type_error: 'Выберите статус' }
  ),
  description: z.string().min(1, { message: 'Описание слишком короткое' }),
  skills: z
    .object({
      value: z.string(),
      id: z.number(),
    })
    .array()
    .min(1, { message: 'Выберите навк' }),
  link: z.string().optional(),
  employee_comment: z.string().optional().nullable(),
  chief_comment: z.string().optional().nullable(),
});

export type TaskFormDataType = z.infer<typeof taskFormSchema>;
