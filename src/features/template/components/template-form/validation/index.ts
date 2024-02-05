import { z } from 'zod';

export const templateFormSchema = z.object({
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
    .object({
      value: z.string().min(1, 'Выберите навык'),
      id: z.number().min(1, 'Выберите навык'),
    })
    .array()
    .min(1, 'Выберите навык'),
  grade: z
    .object({
      value: z.string(),
      id: z.number(),
    })
    .optional(),
  description: z
    .string({
      required_error: 'Заполните поле',
      invalid_type_error: 'Заполните поле',
    })
    .min(1, 'Заполните поле'),
  link: z.string().optional(),
  duration: z
    .object({
      value: z.string(),
      id: z.number(),
    })
    .optional(),
  recommendation: z.string().optional(),
});

export type TemplateFormDataType = z.infer<typeof templateFormSchema>;
