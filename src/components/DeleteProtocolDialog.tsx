import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface Props {
  open: boolean;
  protocol?: number;
  title?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteProtocolDialog({
  open,
  protocol,
  title,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle fontWeight={600}>
        Excluir protocolo
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          Tem certeza que deseja excluir o protocolo{" "}
          <strong>{protocol}</strong>?
        </Typography>

        {title && (
          <Typography
            variant="body2"
            mt={1}
            color="text.secondary"
          >
            <strong>Título:</strong> {title}
          </Typography>
        )}

        <Typography
          variant="body2"
          mt={2}
          color="error"
        >
          Essa ação não poderá ser desfeita.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="text">
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
}
