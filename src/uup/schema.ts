import { z } from 'zod';
import { ALLOWED_BRANCHES } from './const';

// prettier-ignore
const RING = ['CANARY','DEV','BETA','RELEASEPREVIEW','WIF','WIS','RP','RETAIL','MSIT'] as const;
const ARCH = ['x86', 'amd64', 'arm', 'arm64'] as const;
const FLIGHT = ['Mainline', 'Active', 'Skip', 'Current'] as const;
const TYPE = ['Production', 'Test'] as const;

export const zArch = z
  .union([z.string(), z.array(z.string())], { message: 'invalid arch' })
  .default('amd64')
  .transform((val, ctx) => {
    const inputArches = val === 'all' ? ARCH : Array.isArray(val) ? val : [val];
    const arches = new Set<(typeof ARCH)[number]>();
    for (const i in inputArches) {
      let arch = inputArches[i].toLowerCase() as (typeof ARCH)[number];
      if (!ARCH.includes(arch)) {
        ctx.addIssue({ code: 'custom', message: `invalid arch: ${arch}` });
        break;
      }
      arches.add(arch);
    }
    return Array.from(arches);
  });

export const zRequestParams = z
  .object({
    /** Target Architecture (amd64, arm64, x86 ...). */
    arch: zArch,
    /** Update Ring ('CANARY', 'DEV', 'BETA' ...) */
    ring: z.enum(RING, { message: 'invalid ring' }).default('WIF'),
    /** Update flight */
    flight: z.enum(FLIGHT, { message: 'invalid flight' }).default('Active'),

    /** Update build version */
    build: z
      .string()
      .default('latest')
      .refine((val) => val === 'latest' || zBuildVersion.safeParse(val).success, { message: 'invalid build' }),

    /** Update branch (ge_release, zn_release ...) */
    branch: z
      .string()
      .default('auto')
      .transform((val) => {
        return ALLOWED_BRANCHES.includes(val.toLowerCase()) ? val : 'auto';
      }),

    /** Product SKU */
    sku: z.coerce.number().int().positive().default(48),

    /** Update type (Production,Test) */
    type: z.enum(TYPE, { message: 'unknown type' }).default('Production'),

    /** Update Flags */
    flags: z.array(z.string()).default([]),
  })
  .transform((val, ctx) => {
    if (val.flight === 'Skip' && val.ring !== 'WIF') {
      ctx.addIssue({ code: 'custom', message: 'incomparable flight and ring ', path: ['flight'] });
    }
    if (val.flight === 'Active' && val.ring === 'RP') {
      val.flight = 'Current';
    }
    return val;
  });

export type RequestParams = z.infer<typeof zRequestParams>;

export const zBuildVersion = z
  .string()
  .regex(/^(\d+)\.(\d+)\.(\d+)(?:\.(\d+))?$/, { message: 'invalid build version' })
  .transform((val, ctx) => {
    const match = val.match(/^(\d+)\.(\d+)\.(\d+)(?:\.(\d+))?$/)!;
    const [, vWin, vWinMinor, vMajor, vMinor = 0] = match;
    const zNonnegativeInt = z.coerce.number({ message: 'must be a positive number' }).int().nonnegative();

    const major = zNonnegativeInt.min(9841, { message: 'invalid build version' }).safeParse(vMajor);
    if (major.error) ctx.addIssue(major.error.issues[0]);

    const minor = zNonnegativeInt.min(0, { message: 'invalid minor version' }).default(0).safeParse(vMinor);
    if (minor.error) ctx.addIssue(minor.error.issues[0]);

    return {
      build: `${vWin}.${vWinMinor}.${vMajor}`,
      vMajor: major.data!,
      vMinor: minor.data!,
    };
  });

export type BuildVersion = z.infer<typeof zBuildVersion>;

export const zCookieData = z.object({
  data: z
    .string({ message: 'invalid cookie data' })
    .regex(/^[-A-Za-z0-9+/=]|=[^=]|={3,}$/, { message: 'invalid cookie data' })
    .min(1, { message: 'cookie data is required' }),
  expires: z
    .string({ message: 'invalid expiry date' })
    .datetime({ message: 'invalid expiry date' })
    .min(1, { message: 'expiry date is required' }),
});

export type CookieData = z.infer<typeof zCookieData>;
