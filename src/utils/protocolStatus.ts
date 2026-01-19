// src/utils/protocolStatus.ts
import type { AnalyzedStatus } from "../types/Protocol";

export function getStatusUI(status?: AnalyzedStatus) {
  switch (status) {
    case "PROCESSING":
      return {
        label: "Analisando",
        color: "warning",
        icon: "🤖",
        animated: true,
      };

    case "COMPLETED":
      return {
        label: "Completo",
        color: "success",
        icon: "✨",
      };

    case "ERROR":
      return {
        label: "Erro",
        color: "error",
        icon: "⚠️",
      };

    case "PENDING":
    default:
      return {
        label: "Pendente",
        color: "default",
        icon: "📝",
      };
  }
}
