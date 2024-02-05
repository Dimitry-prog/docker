import { z } from 'zod';

export const loginFormSchema = z.object({
  username: z.string().email({ message: 'Введите email' }),
  password: z.string().min(1, { message: 'Введите пароль' }),
});

export type LoginFormDataType = z.infer<typeof loginFormSchema>;
