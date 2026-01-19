import { IconButton, Tooltip } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import type { Protocol } from "../types/Protocol";

interface Props {
  protocol: Protocol;
  isProcessing: boolean;
  onAnalyze: (protocolId: number) => void;
}


export function IAButton({ protocol, isProcessing, onAnalyze }: Props) {
  const handleClick = () => {
    if (!isProcessing) {
      onAnalyze(protocol.protocol);
    }
  };

  return (
    <Tooltip
      title={
        isProcessing
          ? "IA está analisando este protocolo"
          : "Enviar para análise por IA"
      }
    >
      <span>
        <IconButton
          size="small"
          onClick={handleClick}
          disabled={isProcessing}
          sx={{ color: isProcessing ? "#ff9800" : "#7b61ff" }}
        >
          <AutoAwesomeIcon className={isProcessing ? "spin" : ""} />
        </IconButton>
      </span>
    </Tooltip>
  );
}

