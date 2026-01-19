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
 * Atualiza dados do protocolo (edição)
 */
export async function updateProtocol(
  protocolId: number,
  data: Partial<Protocol>
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/protocols/${protocolId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao atualizar protocolo");
  }
}

/**
 * Atualiza SOMENTE o analyzedStatus
 */
export async function updateAnalyzedStatus(
  protocolId: number,
  analyzedStatus: "PENDING" | "PROCESSING" | "COMPLETED" | "ERROR"
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/protocols/${protocolId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ analyzedStatus }),
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao atualizar status");
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
