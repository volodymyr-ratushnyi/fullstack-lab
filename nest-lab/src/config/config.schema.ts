import z from 'zod'
import ms, { StringValue } from 'ms';

export const envSchema = z.object({
  COOKIES_SECRET: z.string().min(1),

  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z
    .string()
    .default('1d')
    .refine(
      (value) => ms(value as StringValue) !== undefined,
      { message: 'JWT_EXPIRES_IN must be a valid ms value (e.g. "1d", "2h", "30m")' }
    )
    .transform((val) => val as StringValue),

  DB_TYPE: z.enum(['postgres', 'mongodb']),
  MONGO_URL: z.string().min(1),
});

export type EnvConfig = z.infer<typeof envSchema>;
