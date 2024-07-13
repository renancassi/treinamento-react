import { z } from 'zod';

const envSchema = z.object({
  EXPO_PUBLIC_API_KEY: z.coerce.string(),
  EXPO_PUBLIC_ID_PROJECT: z.coerce.string(),
});

export const env = envSchema.parse(process.env);
