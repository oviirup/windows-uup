import { env, isDev, isPreview } from './env.js';

export const SITE_NAME = 'Windows UUP';
export const SITE_DESC = `Download Window Update files directly from Microsoft Servers and convert to ISO files`;

export const SITE_URL = isDev
  ? `http://localhost:${env.PORT}/`
  : isPreview
    ? `https://${env.VERCEL_URL}/`
    : `https://${env.NEXT_PUBLIC_DOMAIN}/`;
