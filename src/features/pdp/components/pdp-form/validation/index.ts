import { z } from 'zod';

export const pdpFormSchema = z.object({
  goal: z
    .string()
    .min(1, { message: 'Название слишком короткое' })
    .max(100, { message: 'Максимальное кол-во символов 100' }),
  starting_date: z.coerce.number({
    invalid_type_error: 'Заполните поле',
  }),
  deadline: z.coerce.number({
    invalid_type_error: 'Заполните поле',
  }),
});

export type PdpFormDataType = z.infer<typeof pdpFormSchema>;
