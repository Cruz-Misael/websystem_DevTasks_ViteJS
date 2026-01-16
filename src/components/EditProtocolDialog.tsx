import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from "@mui/material";
import { useState, useEffect } from "react";
import type { Protocol } from "../types/Protocol";

interface Props {
  open: boolean;
  protocol: Protocol | null;
  onClose: () => void;
  onSave: (protocol: Protocol) => void;
}

export function EditProtocolDialog({
  open,
  protocol,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] = useState<Partial<Protocol>>({});

  useEffect(() => {
    if (protocol) {
      setForm(protocol);
    }
  }, [protocol]);

  function handleChange(field: keyof Protocol, value: any) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Editar Protocolo</DialogTitle>

<DialogContent>
  <Box sx={{ 
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: 2,
    mt: 1 
  }}>
    <Box sx={{ gridColumn: 'span 12' }}>
      <TextField
        label="Título"
        fullWidth
        value={form.title || ""}
        onChange={(e) => handleChange("title", e.target.value)}
      />
    </Box>

    <Box sx={{ gridColumn: 'span 12' }}>
      <TextField
        label="Descrição"
        fullWidth
        multiline
        rows={3}
        value={form.description || ""}
        onChange={(e) => handleChange("description", e.target.value)}
      />
    </Box>

    <Box sx={{ gridColumn: 'span 4' }}>
      <TextField
        label="Dev Days"
        type="number"
        fullWidth
        value={form.devDays ?? ""}
        onChange={(e) => handleChange("devDays", Number(e.target.value))}
      />
    </Box>

    <Box sx={{ gridColumn: 'span 4' }}>
      <TextField
        label="Workload"
        type="number"
        fullWidth
        value={form.workload ?? ""}
        onChange={(e) => handleChange("workload", Number(e.target.value))}
      />
    </Box>

    <Box sx={{ gridColumn: 'span 4' }}>
      <TextField
        label="Savings"
        type="number"
        fullWidth
        value={form.savings ?? ""}
        onChange={(e) => handleChange("savings", Number(e.target.value))}
      />
    </Box>

    <Box sx={{ gridColumn: 'span 6' }}>
    <TextField
        label="Previsão de Início"
        type="date"
        fullWidth
        InputLabelProps={{ shrink: true }}
        value={form.supposedStart ?? ""}
        onChange={(e) => handleChange("supposedStart", e.target.value)}
    />
    </Box>

    <Box sx={{ gridColumn: 'span 6' }}>
    <TextField
        label="Previsão de Término"
        type="date"
        fullWidth
        InputLabelProps={{ shrink: true }}
        value={form.supposedEnd ?? ""}
        onChange={(e) => handleChange("supposedEnd", e.target.value)}
    />
    </Box>

  </Box>
</DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          variant="contained"
          onClick={() => onSave(form as Protocol)}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}