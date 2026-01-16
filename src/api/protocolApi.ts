import { http } from "./http";
import type { Protocol } from "../types/Protocol";

export async function getProtocol(protocol: number): Promise<Protocol> {
  const { data } = await http.get(`/protocols/${protocol}`);
  return data;
}

export async function updateProtocol(
  protocol: number,
  payload: Partial<Protocol>
) {
  await http.put(`/protocols/${protocol}`, payload);
}

export async function analyzeProtocol(protocol: number) {
  await http.post(`/protocols/${protocol}/analyze`);
}

export async function deleteProtocol(protocol: number) {
  await http.delete(`/protocols/${protocol}`);
}

export async function getProtocols(): Promise<Protocol[]> {
  const { data } = await http.get("/protocols");
  return data;
}
