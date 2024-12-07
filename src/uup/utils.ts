import { randomBytes } from 'crypto';
import { BRANCH_MAP } from './const';
import { BuildVersion, zBuildVersion } from './schema';

/** Generate random uuid */
export function generateUUID() {
  let d = Date.now();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return c === 'x' ? r.toString(16) : ((r & 0x3) | 0x8).toString(16);
  });
}

/** Generates a device-specific encoded string based on random and fixed values. */
export function uupDevice() {
  const start = `13003002c377040014d5bcac7a66de0d50beddf9bba16c87edb9e019898000`;
  const rand = randomBytes(1054 / 2).toString('hex');
  const end = `b401`;

  const valueRaw = start + rand + end;
  const valueHex = Buffer.from(valueRaw, 'hex').toString('binary');
  const value = Buffer.from(valueHex, 'binary').toString('base64');
  const data = `t=${value}&p=`;

  const segments = `${data.split('').join('\0')}\0`;
  return Buffer.from(segments).toString('base64');
}

export function getBranchFromBuild(build: string | BuildVersion) {
  let buildVersion: BuildVersion;
  if (typeof build === 'string') {
    const parsedBuild = zBuildVersion.safeParse(build);
    if (!parsedBuild.success) {
      throw new Error(parsedBuild.error.message);
    }
    buildVersion = parsedBuild.data;
  } else if (typeof build === 'object' && Object.hasOwn(build, 'build')) {
    buildVersion = build;
  } else {
    throw new Error('invalid build version');
  }

  const { vMajor } = buildVersion;
  return vMajor in BRANCH_MAP ? BRANCH_MAP[vMajor as keyof typeof BRANCH_MAP] : 'rs_prerelease';
}
