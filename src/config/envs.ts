import 'dotenv/config';
import { z } from 'zod';

const envVarsSchema = z.object({
  PORT: z.coerce.number().min(1, 'PORT is required'),
  ALLOWED_ORIGINS: z
    .string()
    .min(1, 'ALLOWED_ORIGINS is required')
    .transform((val) => val.split(',').map((origin) => origin.trim())),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  REDIS_URL: z.string().min(1, 'REDIS_URL is required'),
});

const { error, data } = envVarsSchema.safeParse(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envConfig = data;
