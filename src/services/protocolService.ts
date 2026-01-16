import type { Protocol } from "../types/Protocol";

const API_BASE_URL = import.meta.env.VITE_API_URL

/**
 * Lista todos os protocolos
 */
export async function fetchProtocols(): Promise<Protocol[]> {
  const response = await fetch(`${API_BASE_URL}/protocols`);

  if (!response.ok) {
    throw new Error("Erro ao buscar protocolos");
  }

  return response.json();
}

/**
 * Atualiza o campo savings de um protocolo
 */
export async function updateProtocol(protocol: Protocol): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/protocols/${protocol.protocol}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: protocol.title,
        description: protocol.description,
        devDays: protocol.devDays,
        workload: protocol.workload,
        savings: protocol.savings,
        supposedStart: protocol.supposedStart,
        supposedEnd: protocol.supposedEnd,
        status: protocol.status,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao atualizar protocolo");
  }
}



/**
 * Envia protocolo para análise de IA
 */
export async function analyzeProtocol(protocolId: number): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/protocols/${protocolId}/analyze`,
    {
      method: "POST"
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao enviar protocolo para IA");
  }
}
