import { useState } from "react";
import {
  getProtocol,
  updateProtocol,
  analyzeProtocol,
  deleteProtocol
} from "../api/protocolApi";
import type { Protocol } from "../types/Protocol";

export function useProtocol() {
  const [protocol, setProtocol] = useState<Protocol | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetch(protocolNumber: number) {
    try {
      setLoading(true);
      setError(null);
      const data = await getProtocol(protocolNumber);
      setProtocol(data);
    } catch {
      setProtocol(null);
      setError("Protocolo não encontrado");
    } finally {
      setLoading(false);
    }
  }

  async function update(payload: Partial<Protocol>) {
    if (!protocol) return;
    await updateProtocol(protocol.protocol, payload);
    setProtocol({ ...protocol, ...payload });
  }

  async function analyze() {
    if (!protocol) return;
    await analyzeProtocol(protocol.protocol);
    setProtocol({ ...protocol, status: "processing" });
  }

  async function remove() {
    if (!protocol) return;
    await deleteProtocol(protocol.protocol);
    setProtocol(null);
  }

  return {
    protocol,
    loading,
    error,
    fetch,
    update,
    analyze,
    remove
  };
}
