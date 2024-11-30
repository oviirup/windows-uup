import { ALLOWED_BRANCHES } from '@/uup/const';
import { z } from 'zod';

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
      .refine((val) => ARCH.includes(val.toLowerCase() as any), { message: 'UNKNOWN_ARCH' })
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
    ring: z
      .enum(RING, { message: 'UNKNOWN_RING' })
      .default('WIF')
      .transform((val) => {
        // prettier-ignore
        switch (val) {
          case 'DEV': return 'WIF';
          case 'BETA': return 'WIS';
          case 'RELEASEPREVIEW': return 'RP';
          default: return val;
        }
      }),

    /** Update flight */
    flight: z.enum(FLIGHT, { message: 'UNKNOWN_FLIGHT' }).default('Active'),

    /** Update build version */
    build: z
      .string()
      .default('latest')
      .refine((val) => val === 'latest' || z.coerce.number().min(9841).safeParse(val.split('.')[0]).success, {
        message: 'UNKNOWN_BUILD',
      }),

    /** Update branch (ge_release, zn_release ...) */
    branch: z
      .string()
      .default('ge_release')
      .transform((val) => {
        return ALLOWED_BRANCHES.includes(val.toLowerCase()) ? val : 'auto';
      }),

    /** Product SKU */
    sku: z.coerce.number().int().positive().default(48),

    /** Update type (Production,Test) */
    type: z.enum(TYPE, { message: 'UNKNOWN_TYPE' }).default('Production'),

    /** Update Flags */
    flags: z.array(z.string()).default([]).optional(),
  })
  .transform((val, ctx) => {
    if (!(val.flight === 'Skip' && val.ring !== 'WIF')) {
      ctx.addIssue({ code: 'custom', message: 'UNKNOWN_COMBINATION', path: ['flight', 'ring'] });
    }
    if (val.flight === 'Active' && val.ring === 'RP') {
      val.flight = 'Current';
    }
    return val;
  });

export type RequestParams = z.infer<typeof zRequestParams>;

export const zBuildVersion = z
  .string()
  .regex(/^(\d+)\.(\d+)\.(\d+)(?:\.(\d+))?$/, { message: 'INVALID_BUILD_VERSION' })
  .transform((val) => {
    const match = val.match(/^(\d+)\.(\d+)\.(\d+)(?:\.(\d+))?$/);
    if (!match) {
      throw new Error('INVALID_BUILD_VERSION');
    }
    const [, vWin, vWinMinor, build, minor = 0] = match;
    return {
      build: `${vWin}.${vWinMinor}.${build}`,
      major: parseInt(build),
      minor: minor ? parseInt(minor) : 0,
    };
  });
