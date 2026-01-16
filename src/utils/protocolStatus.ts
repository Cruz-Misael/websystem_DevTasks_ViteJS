import type { Protocol } from "../types/Protocol";

export function getStatusUI(protocol: Protocol) {
  // ERRO explícito
  if (protocol.status === "error") {
    return {
      label: "Erro",
      color: "error",
      icon: "⚠️",
    };
  }

  // PROCESSANDO
  if (protocol.status === "processing") {
    return {
      label: "Analisando",
      color: "warning",
      icon: "🤖",
      animated: true,
    };
  }

  // ✅ COMPLETO POR REGRA DE NEGÓCIO
  if (protocol.supposedEnd) {
    return {
      label: "Completo",
      color: "success",
      icon: "✨",
    };
  }

  // PADRÃO
  return {
    label: "Pendente",
    color: "default",
    icon: "📝",
  };
}
