import { z } from 'zod';

export const LoginBodyRequestSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type LoginBodyRequestSchemaType = z.infer<typeof LoginBodyRequestSchema>;
