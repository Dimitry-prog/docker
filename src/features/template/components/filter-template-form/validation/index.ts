import { z } from 'zod';

export const filterTemplateFormSchema = z.object({
  title: z
    .string({
      required_error: 'Заполните поле',
      invalid_type_error: 'Заполните поле',
    })
    .min(1, 'Заполните поиск'),
  direction: z
    .object({
      value: z.string(),
      id: z.number(),
    })
    .optional(),
  type: z
    .object({
      value: z.string(),
      id: z.number(),
    })
    .optional(),
  skills: z
    .array(
      z.object({
        value: z.string(),
        id: z.number(),
      })
    )
    .optional(),
  grade: z
    .array(
      z.object({
        value: z.string(),
        id: z.number(),
      })
    )
    .optional(),
  creator: z
    .object({
      value: z.string(),
      id: z.number(),
    })
    .optional(),
});

export type FilterTemplateFormDataType = z.infer<typeof filterTemplateFormSchema>;
