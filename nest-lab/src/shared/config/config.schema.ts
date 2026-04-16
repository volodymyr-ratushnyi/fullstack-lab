import z from 'zod'
import ms, { StringValue } from 'ms';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),

  COOKIES_SECRET: z.string().min(1),

  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z
    .string()
    .default('1d')
    .refine((value) => ms(value as StringValue) !== undefined, {
      message:
        'JWT_EXPIRES_IN must be a valid ms value (e.g. "1d", "2h", "30m")',
    })
    .transform((val) => val as StringValue),

  DB_TYPE: z.enum(['postgres', 'mongodb']),

  MONGO_USER: z.string(),
  MONGO_PASSWORD: z.string(),
  MONGO_HOST: z.string(),
  MONGO_PORT: z.coerce.number(),
  MONGO_DB: z.string(),

  GOOGLE_APP_EMAIL: z.email(),
  GOOGLE_APP_PASSWORD: z.string().min(1),
});

export type EnvConfig = z.infer<typeof envSchema>;
