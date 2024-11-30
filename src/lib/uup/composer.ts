import { generateUUID, uupDevice } from './utils';

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
