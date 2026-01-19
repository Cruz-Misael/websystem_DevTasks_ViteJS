import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Chip,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import { IAButton } from "./IAButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RefreshIcon from "@mui/icons-material/Refresh";

import type { Protocol } from "../types/Protocol";
import { getStatusUI } from "../utils/protocolStatus";

interface Props {
  rows: Protocol[];
  onEdit: (protocol: Protocol) => void;
  onAnalyze: (protocolId: number) => void;
  onDelete: (protocol: Protocol) => void;
  onRefresh: () => void;
}

export function ProtocolTable({
  rows,
  onEdit,
  onAnalyze,
  onDelete,
  onRefresh,
}: Props) {
  const columns: GridColDef[] = [
    {
      field: "protocol",
      headerName: "Protocol",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 2,
      minWidth: 220,
    },
    {
      field: "workload",
      headerName: "Workload (hrs)",
      flex: 1,
      minWidth: 100,
      renderCell: (p) => p.value ?? "—",
    },
    {
      field: "devDays",
      headerName: "Dev Days",
      flex: 1,
      minWidth: 110,
      renderCell: (p) => p.value ?? "—",
    },
    {
      field: "supposedStart",
      headerName: "Start Date",
      flex: 1,
      minWidth: 120,
      renderCell: (p) => p.value ?? "—",
    },
    {
      field: "supposedEnd",
      headerName: "End Date",
      flex: 1,
      minWidth: 120,
      renderCell: (p) => p.value ?? "—",
    },
    {
      field: "savings",
      headerName: "Savings",
      flex: 1,
      minWidth: 120,
      renderCell: (p) => (p.value ? `R$ ${p.value}` : "—"),
    },

    // STATUS
 {
  field: "status",
  headerName: "Status",
  minWidth: 170,
  sortable: false,
    renderCell: (p) => {
      const status = p.row.analyzedStatus ?? "PENDING";

      const ui = getStatusUI(status);

      return (
        <Chip
          size="small"
          color={ui.color as any}
          label={ui.label}
        />
      );
    }

  },
    {
      field: "ai",
      headerName: "AI",
      width: 80,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (p) => {
        const isProcessing = p.row.analyzedStatus === "PROCESSING";

        return (
          <IAButton
            protocol={p.row}
            isProcessing={isProcessing}
            onAnalyze={onAnalyze}
          />
        );
      },
    },

    // ACTIONS
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 190,
      sortable: false,
      filterable: false,
      renderCell: (p) => (
        <Stack direction="row" spacing={0.5}>
          <Button size="small" onClick={() => onEdit(p.row)}>
            Editar
          </Button>

          <IconButton
            size="small"
            color="error"
            onClick={() => onDelete(p.row)}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Box
      sx={{
        height: "65vh",
        backgroundColor: "#fff",
        borderRadius: "14px",
        border: "1px solid #e6e8eb",
        overflow: "hidden",
      }}
    >
      {/* HEADER */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 2, py: 1, borderBottom: "1px solid #eee" }}
      >
        <strong>Protocolos</strong>

        <Tooltip title="Atualizar dados">
          <IconButton onClick={onRefresh}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      {/* TABLE */}
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.protocol}
        density="compact" 
        rowHeight={42}         
        columnHeaderHeight={44}
        sx={{
          fontSize: "0.75rem",
          "& .MuiDataGrid-columnHeaders": {
            fontSize: "0.7rem",
          },
          "& .MuiButton-root": {
            fontSize: "0.65rem",
            minHeight: 26,
            padding: "2px 6px",
          },
        }}
      />

    </Box>
  );
}
