import z from 'zod'
import ms, { StringValue } from 'ms';

export const envSchema = z.object({
  COOKIES_SECRET: z.string().min(1),

  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z
    .string()
    .default('1d')
    .refine((val) => ms(val as StringValue) !== undefined, {
      message:
        'JWT_EXPIRES_IN must be a valid ms value (e.g. "1d", "2h", "30m")',
    })
    .transform((val) => val as StringValue),

  DB_TYPE: z.enum(['postgres', 'mongodb']),

  POSTGRES_USER: z.string().min(1),
  POSTGRES_PASSWORD: z.string().min(6),
  POSTGRES_HOST: z.string().min(1),
  POSTGRES_PORT: z.coerce.number().int().min(1000).max(9999).default(5432),
  POSTGRES_DB: z.string().min(1),

  MONGO_USER: z.string().min(1),
  MONGO_PASSWORD: z.string().min(6),
  MONGO_HOST: z.string().min(1),
  MONGO_PORT: z.coerce.number().int().min(1),
  MONGO_DB: z.string().min(1),
});

export type EnvConfig = z.infer<typeof envSchema>;
