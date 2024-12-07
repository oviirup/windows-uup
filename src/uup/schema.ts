import { z } from 'zod';
import { ALLOWED_BRANCHES } from './const';

// prettier-ignore
const RING = ['CANARY','DEV','BETA','RELEASEPREVIEW','WIF','WIS','RP','RETAIL','MSIT'] as const;
const ARCH = ['x86', 'x64', 'amd64', 'arm', 'arm64', 'all'] as const;
const FLIGHT = ['Mainline', 'Active', 'Skip', 'Current'] as const;
const TYPE = ['Production', 'Test'] as const;

export const zRequestParams = z
  .object({
    /** Target Architecture (amd64, arm64, x86 ...). */
    arch: z
      .string()
      .refine((val) => ARCH.includes(val.toLowerCase() as any), { message: 'invalid arch' })
      .default('amd64')
      .transform((val) => {
        const arch = val.toLowerCase();
        // prettier-ignore
        switch (arch) {
          case 'x64': return 'amd64';
          case 'arm': return 'arm64';
          default: return arch;
        }
      }),
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
