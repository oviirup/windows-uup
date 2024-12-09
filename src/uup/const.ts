import path from 'path';

export const UUP_STORE_PATH = path.resolve('.uup');

// prettier-ignore
export const ALLOWED_BRANCHES = [
  'auto','rs2_release','rs3_release','rs4_release','rs5_release','rs5_release_svc_hci','19h1_release','vb_release',
  'fe_release_10x','fe_release','co_release','ni_release','zn_release','ge_release','rs_prerelease',
];

export const API_ENDPOINTS = {
  client: `https://fe3.delivery.mp.microsoft.com/ClientWebService/client.asmx`,
  secured: `https://fe3cr.delivery.mp.microsoft.com/ClientWebService/client.asmx/secured`,
} as const;

export const BRANCH_MAP = {
  15063: 'rs2_release',
  16299: 'rs3_release',
  17134: 'rs4_release',
  17763: 'rs5_release',
  17784: 'rs5_release_svc_hci',
  18362: '19h1_release',
  18363: '19h1_release',
  19041: 'vb_release',
  19042: 'vb_release',
  19043: 'vb_release',
  19044: 'vb_release',
  19045: 'vb_release',
  19046: 'vb_release',
  20279: 'fe_release_10x',
  20348: 'fe_release',
  20349: 'fe_release',
  22000: 'co_release',
  22621: 'ni_release',
  22631: 'ni_release',
  25398: 'zn_release',
  26100: 'ge_release',
} as const;
