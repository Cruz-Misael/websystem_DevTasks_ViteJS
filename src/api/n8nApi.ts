// n8napi.ts
import { http } from "./http";

export async function sendProtocolToN8n(protocolNumber: number) {
  await http.post(`/protocols/${protocolNumber}/analyze`);
}
