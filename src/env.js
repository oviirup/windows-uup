import { envalid } from '@oviirup/envalid';
import { vercel } from '@oviirup/envalid/presets';
import { z } from 'zod';

export const env = envalid({
  extends: [vercel()],
  shared: {
    NODE_ENV: z.enum(['development', 'production', 'test']),
    PORT: z.string(),
  },
  // variables only exposed to client
  client: {
    NEXT_PUBLIC_DOMAIN: z.string(),
  },
  // variables only exposed to server
  server: {},
  // must specify all variables individually
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    PORT: process.env.PORT ?? '3000', // Next.JS build script dynamically adds the PORT env, so it needs a fallback value
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
  },
  // Only run validation if process is started from Next.js
  skipValidation: !process.env.NEXT_RUNTIME,
});

export const isProd = env.NODE_ENV === 'production';
export const isDev = env.NODE_ENV === 'development';
export const isPreview = env.VERCEL_ENV === 'preview';
