import { SKU_MAP } from './const';
import { getCookie } from './request';
import { RequestParams, zBuildVersion } from './schema';
import { generateUUID, getBranchFromBuild, uupDevice } from './utils';

/** Creates the POST body for getting cookie */
export function composeCookieRequest() {
  const device = uupDevice();
  const uuid = generateUUID();

  const now = Date.now();
  const timeCreated = new Date(now).toISOString();
  const timeExpires = new Date(now + 120_1000).toISOString();
  const timeCookieExpires = new Date(now + 604_800_1000).toISOString();

  return `
  <s:Envelope xmlns:a="http://www.w3.org/2005/08/addressing" xmlns:s="http://www.w3.org/2003/05/soap-envelope">
    <s:Header>
      <a:Action s:mustUnderstand="1">http://www.microsoft.com/SoftwareDistribution/Server/ClientWebService/GetCookie</a:Action>
      <a:MessageID>urn:uuid:${uuid}</a:MessageID>
      <a:To s:mustUnderstand="1">https://fe3.delivery.mp.microsoft.com/ClientWebService/client.asmx</a:To>
      <o:Security s:mustUnderstand="1" xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
        <Timestamp xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
          <Created>${timeCreated}</Created>
          <Expires>${timeExpires}</Expires>
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
          <Expiration>${timeCreated}</Expiration>
        </oldCookie>
        <lastChange>${timeCreated}</lastChange>
        <currentTime>${timeCreated}</currentTime>
        <protocolVersion>2.0</protocolVersion>
      </GetCookie>
    </s:Body>
  </s:Envelope>`;
}

/** Creates the device attributes from request params */
export function composeDeviceAttributes({
  arch: arches,
  branch = 'auto',
  build,
  flags = [],
  ring,
  sku = 48,
  type,
}: RequestParams) {
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
  if (SKU_MAP.blocked.includes(sku)) {
    blockUpgrades = 1;
  } else if (SKU_MAP.team.includes(sku)) {
    dvcFamily = 'Windows.Team';
  } else if (SKU_MAP.server.includes(sku)) {
    dvcFamily = 'Windows.Server';
    insType = 'Server';
    prodType = 'ServerNT';
    blockUpgrades = 1;
  } else if (SKU_MAP.core.includes(sku)) {
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
    `OSArchitecture=${arches[0]}`,
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

/** Create post body to fetch latest windows update info */
export async function composeFetchUpdateRequest({
  arch: arches,
  branch = 'auto',
  build,
  flags = [],
  flight,
  ring,
  sku = 48,
  type = 'Production',
}: RequestParams) {
  const cookie = await getCookie();

  if (!cookie?.data) {
    return null;
  }

  const device = uupDevice();
  const uuid = generateUUID();

  const now = Date.now();
  const timeCreated = new Date(now).toISOString();
  const timeExpires = new Date(now + 120_000).toISOString();

  if (branch === 'auto') {
    branch = getBranchFromBuild(build);
  }

  let productId = 'Client.OS.rs2';
  const productParams: string[] = [];

  // process product id from sku
  if (SKU_MAP.server.includes(sku)) {
    productId = 'Server.OS';
  } else if (sku === 180) {
    productId = 'WCOSDevice2.OS';
  } else if (sku === 184) {
    productId = 'WCOSDevice1.OS';
  } else if (sku === 189) {
    productId = 'WCOSDevice0.OS';
  } else if (sku === 210) {
    productId = 'WNC.OS';
  }

  for (const arch of arches) {
    const productArchInfo = [
      `PN=$mainProduct.${arch}&Branch=${branch}&PrimaryOSProduct=1&Repairable=1&V=${build}&ReofferUpdate=1`,
      `PN=Adobe.Flash.${arch}&Repairable=1&V=0.0.0.0`,
      `PN=Microsoft.Edge.Stable.${arch}&Repairable=1&V=0.0.0.0`,
      `PN=Microsoft.NETFX.${arch}&V=0.0.0.0`,
      `PN=Windows.Autopilot.${arch}&Repairable=1&V=0.0.0.0`,
      `PN=Windows.AutopilotOOBE.${arch}&Repairable=1&V=0.0.0.0`,
      `PN=Windows.Appraiser.${arch}&Repairable=1&V=${build}`,
      `PN=Windows.AppraiserData.${arch}&Repairable=1&V=${build}`,
      `PN=Windows.EmergencyUpdate.${arch}&V=${build}`,
      `PN=Windows.FeatureExperiencePack.${arch}&Repairable=1&V=0.0.0.0`,
      `PN=Windows.ManagementOOBE.${arch}&IsWindowsManagementOOBE=1&Repairable=1&V=${build}`,
      `PN=Windows.OOBE.${arch}&IsWindowsOOBE=1&Repairable=1&V=${build}`,
      `PN=Windows.UpdateStackPackage.${arch}&Name=Update Stack Package&Repairable=1&V=${build}`,
      `PN=Hammer.${arch}&Source=UpdateOrchestrator&V=0.0.0.0`,
      `PN=MSRT.${arch}&Source=UpdateOrchestrator&V=0.0.0.0`,
      `PN=SedimentPack.${arch}&Source=UpdateOrchestrator&V=0.0.0.0`,
      `PN=UUS.${arch}&Source=UpdateOrchestrator&V=0.0.0.0`,
    ];
    productParams.push(...productArchInfo);
  }

  const callerParams = [
    'Profile=AUv2',
    'Acquisition=1',
    'Interactive=1',
    'IsSeeker=1',
    'SheddingAware=1',
    'Id=MoUpdateOrchestrator',
  ];

  const deviceAttrib = composeDeviceAttributes({ arch: arches, branch, build, flags, flight, ring, sku, type });
  const productAttrib = encodeURIComponent(productParams.join(';'));
  const callerAttrib = encodeURIComponent(`E:${callerParams.join('&')}`);

  const syncCurrentOnly = flags.includes('thisonly');

  return `
  <s:Envelope xmlns:a="http://www.w3.org/2005/08/addressing" xmlns:s="http://www.w3.org/2003/05/soap-envelope">
    <s:Header>
      <a:Action s:mustUnderstand="1">http://www.microsoft.com/SoftwareDistribution/Server/ClientWebService/SyncUpdates</a:Action>
      <a:MessageID>urn:uuid:${uuid}</a:MessageID>
      <a:To s:mustUnderstand="1">https://fe3.delivery.mp.microsoft.com/ClientWebService/client.asmx</a:To>
      <o:Security s:mustUnderstand="1" xmlns:o="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
        <Timestamp xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
          <Created>${timeCreated}</Created>
          <Expires>${timeExpires}</Expires>
        </Timestamp>
        <wuws:WindowsUpdateTicketsToken wsu:id="ClientMSA" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" xmlns:wuws="http://schemas.microsoft.com/msus/2014/10/WindowsUpdateAuthorization">
          <TicketType Name="MSA" Version="1.0" Policy="MBI_SSL">
            <Device>${device}</Device>
          </TicketType>
        </wuws:WindowsUpdateTicketsToken>
      </o:Security>
    </s:Header>
    <s:Body>
      <SyncUpdates xmlns="http://www.microsoft.com/SoftwareDistribution/Server/ClientWebService">
        <cookie>
          <Expiration>${cookie.expires}</Expiration>
          <EncryptedData>${cookie.data}</EncryptedData>
        </cookie>
        <parameters>
          <ExpressQuery>false</ExpressQuery>
          <InstalledNonLeafUpdateIDs>
            ${'1;10;105939029;105995585;106017178;107825194;10809856;11;117765322;129905029;130040030;130040031;130040032;130040033;133399034;138372035;138372036;139536037;139536038;139536039;139536040;142045136;158941041;158941042;158941043;158941044;159776047;160733048;160733049;160733050;160733051;160733055;160733056;161870057;161870058;161870059;17;19;2;23110993;23110994;23110995;23110996;23110999;23111000;23111001;23111002;23111003;23111004;2359974;2359977;24513870;28880263;296374060;3;30077688;30486944;5143990;5169043;5169044;5169047;59830006;59830007;59830008;60484010;62450018;62450019;62450020;69801474;8788830;8806526;9125350;9154769;98959022;98959023;98959024;98959025;98959026'.split(';').map((id) => `<int>${id}</int>`)}
          </InstalledNonLeafUpdateIDs>
          <OtherCachedUpdateIDs/>
          <SkipSoftwareSync>false</SkipSoftwareSync>
          <NeedTwoGroupOutOfScopeUpdates>true</NeedTwoGroupOutOfScopeUpdates>
          <AlsoPerformRegularSync>true</AlsoPerformRegularSync>
          <ComputerSpec/>
          <ExtendedUpdateInfoParameters>
            <XmlUpdateFragmentTypes>
              <XmlUpdateFragmentType>Extended</XmlUpdateFragmentType>
              <XmlUpdateFragmentType>LocalizedProperties</XmlUpdateFragmentType>
            </XmlUpdateFragmentTypes>
            <Locales>
                <string>en-US</string>
            </Locales>
          </ExtendedUpdateInfoParameters>
          <ClientPreferredLanguages/>
          <ProductsParameters>
              <SyncCurrentVersionOnly>${syncCurrentOnly}</SyncCurrentVersionOnly>
              <DeviceAttributes>${deviceAttrib}</DeviceAttributes>
              <CallerAttributes>${callerAttrib}</CallerAttributes>
              <Products>${productAttrib}</Products>
          </ProductsParameters>
        </parameters>
      </SyncUpdates>
    </s:Body>
  </s:Envelope>`;
}
