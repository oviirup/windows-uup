import { RequestParams, zBuildVersion } from './schema';
import { generateUUID, getBranchFromBuild, uupDevice } from './utils';

/** Creates the POST body for getting cookie */
export function composeCookieRequest() {
  const device = uupDevice();
  const uuid = generateUUID();

  const now = new Date();
  const created = new Date(now).toISOString();
  const expires = new Date(now.getTime() + 120 * 1000).toISOString();

  return `
  <s:Envelope xmlns:a="http://www.w3.org/2005/08/addressing" xmlns:s="http://www.w3.org/2003/05/soap-envelope">
    <s:Header>
      <a:Action s:mustUnderstand="1">http://www.microsoft.com/SoftwareDistribution/Server/ClientWebService/GetCookie</a:Action>
      <a:MessageID>urn:uuid:${uuid}</a:MessageID>
      <a:To s:mustUnderstand="1">https://fe3.delivery.mp.microsoft.com/ClientWebService/client.asmx</a:To>
      <o:Security s:mustUnderstand="1" xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
        <Timestamp xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
          <Created>${created}</Created>
          <Expires>${expires}</Expires>
        </Timestamp>
        <wuws:WindowsUpdateTicketsToken wsu:id="ClientMSA" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" xmlns:wuws="http://schemas.microsoft.com/msus/2014/10/WindowsUpdateAuthorization">
          <TicketType Name="MSA" Version="1.0" Policy="MBI_SSL">
            <Device>${device}</Device>
          </TicketType>
        </wuws:WindowsUpdateTicketsToken>
      </o:Security>
    </s:Header>
    <s:Body>
      <GetCookie xmlns="http://www.microsoft.com/SoftwareDistribution/Server/ClientWebService">
        <oldCookie>
          <Expiration>${created}</Expiration>
        </oldCookie>
        <lastChange>${created}</lastChange>
        <currentTime>${created}</currentTime>
        <protocolVersion>2.0</protocolVersion>
      </GetCookie>
    </s:Body>
  </s:Envelope>`;
}

/** Creates the device attributes from request params */
export function composeDeviceAttributes({ arch, branch, build, ring, sku, type, flags }: Required<RequestParams>) {
  if (branch === 'auto') {
    branch = getBranchFromBuild(build);
  }

  let blockUpgrades = 0;
  let isRetail = 0;
  let dvcFamily = 'Windows.Desktop';
  let insType = 'Client';
  let prodType = 'WinNT';

  let flight = 'Active';
  let flightEnabled = 1;
  let flightBranch = '';
  let flightContent = 'Mainline';
  let flightRing = 'External';

  // process sku ..........

  const skuMap = {
    blocked: [125, 126],
    core: [180, 184, 189],
    team: [119],
    server: [7, 8, 12, 13, 79, 80, 120, 145, 146, 147, 148, 159, 160, 406, 407, 408],
  };
  if (skuMap.blocked.includes(sku)) {
    blockUpgrades = 1;
  } else if (skuMap.team.includes(sku)) {
    dvcFamily = 'Windows.Team';
  } else if (skuMap.server.includes(sku)) {
    dvcFamily = 'Windows.Server';
    insType = 'Server';
    prodType = 'ServerNT';
    blockUpgrades = 1;
  } else if (skuMap.core.includes(sku)) {
    dvcFamily = 'Windows.Core';
    insType = 'FactoryOS';
  }

  // process ring ..........

  if (ring === 'RETAIL') {
    flightContent = flight;
    flightRing = 'Retail';
    flightEnabled = 0;
    isRetail = 1;
  } else if (ring === 'WIF') {
    flightBranch = 'Dev';
  } else if (ring === 'WIS') {
    flightBranch = 'Beta';
  } else if (ring === 'RP') {
    flightBranch = 'ReleasePreview';
  } else if (ring === 'DEV') {
    flightBranch = 'Dev';
    ring = 'WIF';
  } else if (ring === 'BETA') {
    flightBranch = 'Beta';
    ring = 'WIS';
  } else if (ring === 'RELEASEPREVIEW') {
    flightBranch = 'ReleasePreview';
    ring = 'RP';
  } else if (ring === 'MSIT') {
    flightBranch = 'MSIT';
    flightRing = 'Internal';
  } else if (ring === 'CANARY') {
    flightBranch = 'CanaryChannel';
    ring = 'WIF';
  }

  // process build version ..........
  const parsedBuild = zBuildVersion.safeParse(build);
  if (!parsedBuild.success) {
    throw new Error(parsedBuild.error.message);
  }
  const { vMajor, vMinor } = parsedBuild.data;

  if (vMajor < 17763) {
    if (ring === 'RP') {
      flight = 'Current';
    }
    flightBranch = 'external';
    flightContent = flight;
    flightRing = ring;
  }

  const now = Math.floor(Date.now() / 1000);
  const timeCreated = now - 3600;
  const timeExpiry = now + 82800;

  const deviceAttribute = [
    'App=WU_OS',
    `AppVer=${build}`,
    'AttrDataVer=281',
    'AllowInPlaceUpgrade=1',
    'AllowOptionalContent=1',
    'AllowUpgradesWithUnsupportedTPMOrCPU=1',
    `BlockFeatureUpdates=${blockUpgrades}`,
    'BranchReadinessLevel=CB',
    'CIOptin=1',
    `CurrentBranch=${branch}`,
    `DataExpDateEpoch_GE24H2=${timeExpiry}`,
    `DataExpDateEpoch_GE24H2Setup=${timeExpiry}`,
    `DataExpDateEpoch_CU23H2=${timeExpiry}`,
    `DataExpDateEpoch_CU23H2Setup=${timeExpiry}`,
    `DataExpDateEpoch_NI22H2=${timeExpiry}`,
    `DataExpDateEpoch_NI22H2Setup=${timeExpiry}`,
    `DataExpDateEpoch_CO21H2=${timeExpiry}`,
    `DataExpDateEpoch_CO21H2Setup=${timeExpiry}`,
    `DataExpDateEpoch_23H2=${timeExpiry}`,
    `DataExpDateEpoch_22H2=${timeExpiry}`,
    `DataExpDateEpoch_21H2=${timeExpiry}`,
    `DataExpDateEpoch_21H1=${timeExpiry}`,
    `DataExpDateEpoch_20H1=${timeExpiry}`,
    `DataExpDateEpoch_19H1=${timeExpiry}`,
    'DataVer_RS5=2000000000',
    'DefaultUserRegion=191',
    `DeviceFamily=${dvcFamily}`,
    'DeviceInfoGatherSuccessful=1',
    'EKB19H2InstallCount=1',
    'EKB19H2InstallTimeEpoch=1255000000',
    `FlightingBranchName=${flightBranch}`,
    //'FlightContent='.$flightContent,
    `FlightRing=${flightRing}`,
    'Free=gt64',
    'GStatus_GE24H2=2',
    'GStatus_GE24H2Setup=2',
    'GStatus_CU23H2=2',
    'GStatus_CU23H2Setup=2',
    'GStatus_NI23H2=2',
    'GStatus_NI22H2=2',
    'GStatus_NI22H2Setup=2',
    'GStatus_CO21H2=2',
    'GStatus_CO21H2Setup=2',
    'GStatus_22H2=2',
    'GStatus_21H2=2',
    'GStatus_21H1=2',
    'GStatus_20H1=2',
    'GStatus_20H1Setup=2',
    'GStatus_19H1=2',
    'GStatus_19H1Setup=2',
    'GStatus_RS5=2',
    `GenTelRunTimestamp_19H1=${timeCreated}`,
    'InstallDate=1438196400',
    'InstallLanguage=en-US',
    `InstallationType=${insType}`,
    'IsDeviceRetailDemo=0',
    `IsFlightingEnabled=${flightEnabled}`,
    `IsRetailOS=${isRetail}`,
    'LCUVer=0.0.0.0',
    'MediaBranch=',
    `MediaVersion=${build}`,
    'CloudPBR=1',
    'DUScan=1',
    'OEMModel=21F6CTO1WW',
    'OEMModelBaseBoard=21F6CTO1WW',
    'OEMName_Uncleaned=LENOVO',
    'OemPartnerRing=UPSFlighting',
    `OSArchitecture=${arch}`,
    `OSSkuId=${sku}`,
    'OSUILocale=en-US',
    `OSVersion=${build}`,
    'ProcessorIdentifier=Intel64 Family 6 Model 186 Stepping 3',
    'ProcessorManufacturer=GenuineIntel',
    'ProcessorModel=13th Gen Intel(R) Core(TM) i7-1355U',
    `ProductType=${prodType}`,
    `ReleaseType=${type}`,
    'SdbVer_20H1=2000000000',
    'SdbVer_19H1=2000000000',
    'SecureBootCapable=1',
    'TelemetryLevel=3',
    `TimestampEpochString_GE24H2=${timeCreated}`,
    `TimestampEpochString_GE24H2Setup=${timeCreated}`,
    `TimestampEpochString_CU23H2=${timeCreated}`,
    `TimestampEpochString_CU23H2Setup=${timeCreated}`,
    `TimestampEpochString_NI23H2=${timeCreated}`,
    `TimestampEpochString_NI22H2=${timeCreated}`,
    `TimestampEpochString_NI22H2Setup=${timeCreated}`,
    `TimestampEpochString_CO21H2=${timeCreated}`,
    `TimestampEpochString_CO21H2Setup=${timeCreated}`,
    `TimestampEpochString_22H2=${timeCreated}`,
    `TimestampEpochString_21H2=${timeCreated}`,
    `TimestampEpochString_21H1=${timeCreated}`,
    `TimestampEpochString_20H1=${timeCreated}`,
    `TimestampEpochString_19H1=${timeCreated}`,
    'TPMVersion=2',
    'UpdateManagementGroup=2',
    'UpdateOfferedDays=0',
    'UpgEx_GE24H2Setup=Green',
    'UpgEx_GE24H2=Green',
    'UpgEx_CU23H2=Green',
    'UpgEx_NI23H2=Green',
    'UpgEx_NI22H2=Green',
    'UpgEx_CO21H2=Green',
    'UpgEx_23H2=Green',
    'UpgEx_22H2=Green',
    'UpgEx_21H2=Green',
    'UpgEx_21H1=Green',
    'UpgEx_20H1=Green',
    'UpgEx_19H1=Green',
    'UpgEx_RS5=Green',
    'UpgradeAccepted=1',
    'UpgradeEligible=1',
    'UserInPlaceUpgrade=1',
    'VBSState=2',
    'Version_RS5=2000000000',
    `WuClientVer=${build}`,
  ];

  if (flags?.includes('thisonly')) {
    deviceAttribute.push(`MediaBranch=${branch}`);
  }
  if (flags?.includes('corpnet')) {
    deviceAttribute.push('DUInternal=1');
  }

  return encodeURIComponent(`E:${deviceAttribute.join('&')}`);
}
