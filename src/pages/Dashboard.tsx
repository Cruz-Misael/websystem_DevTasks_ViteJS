import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import type { Protocol } from "../types/Protocol";

import {
  fetchProtocols,
  updateProtocol,
  analyzeProtocol,
  updateAnalyzedStatus,
} from "../services/protocolService";

import { deleteProtocol } from "../api/protocolApi";

import { ProtocolTable } from "../components/ProtocolTable";
import { ProtocolFilters } from "../components/ProtocolFilters";
import { EditProtocolDialog } from "../components/EditProtocolDialog";
import { DeleteProtocolDialog } from "../components/DeleteProtocolDialog";

type StatusFilter = "pending" | "completed" | "all";


export default function Dashboard() {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [selected, setSelected] = useState<Protocol | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProtocol, setSelectedProtocol] =
    useState<Protocol | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("pending");

  /* =======================
     LOAD INICIAL
  ======================= */
  useEffect(() => {
    loadProtocols();
  }, []);

  const loadProtocols = async () => {
    const data = await fetchProtocols();
    setProtocols(data);
  };

  /* =======================
     HANDLERS
  ======================= */
  const handleEdit = (protocol: Protocol) => {
    setSelected(protocol);
    setDialogOpen(true);
  };

  const handleSave = async (protocol: Protocol) => {
    await updateProtocol(protocol.protocol, {
      title: protocol.title,
      description: protocol.description,
      devDays: protocol.devDays,
      workload: protocol.workload,
      savings: protocol.savings,
      supposedStart: protocol.supposedStart,
      supposedEnd: protocol.supposedEnd,
    });

    setDialogOpen(false);
    loadProtocols();
  };


  const handleAnalyze = async (protocolId: number) => {
    // 1️⃣ Atualiza status no banco
    await updateAnalyzedStatus(protocolId, "PROCESSING");

    // 2️⃣ Atualiza estado local
    setProtocols((prev) =>
      prev.map((p) =>
        p.protocol === protocolId
          ? { ...p, analyzedStatus: "PROCESSING" }
          : p
      )
    );

    // 3️⃣ Chama a IA
    try {
      await analyzeProtocol(protocolId);
    } catch {
      await updateAnalyzedStatus(protocolId, "ERROR");

      setProtocols((prev) =>
        prev.map((p) =>
          p.protocol === protocolId
            ? { ...p, analyzedStatus: "ERROR" }
            : p
        )
      );
    }
  };

  const handleDeleteClick = (protocol: Protocol) => {
    setSelectedProtocol(protocol);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProtocol) return;

    await deleteProtocol(selectedProtocol.protocol);

    setDeleteOpen(false);
    setSelectedProtocol(null);
    loadProtocols();
  };

  /* =======================
     FILTROS
  ======================= */
  const filteredProtocols = protocols.filter((p) => {
    const title = p.title?.toLowerCase() ?? "";
    const description = p.description?.toLowerCase() ?? "";
    const searchText = search.toLowerCase();

    const textMatch =
      title.includes(searchText) ||
      description.includes(searchText);

    const isCompleted =
      p.analyzedStatus === "COMPLETED" || !!p.supposedEnd;

    const statusOk =
      statusFilter === "all" ||
      (statusFilter === "completed" && isCompleted) ||
      (statusFilter === "pending" && !isCompleted);

    return textMatch && statusOk;
  });

  const handleRefresh = async () => {
    await loadProtocols();
  };

  /* =======================
     RENDER
  ======================= */
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/* HEADER */}
      <Box>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ color: "#8B2E2E" }}
        >
          Protocols
        </Typography>

        <Typography variant="body2" color="text.secondary">
          General list of registered protocols
        </Typography>
      </Box>

      {/* CONTAINER */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#fff",
          borderRadius: 3,
          border: "1px solid #e6e8eb",
          boxShadow: "0 12px 32px rgba(0,0,0,0.06)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* FILTROS */}
        <Box sx={{ pb: 2, borderBottom: "1px solid #e6e8eb" }}>
          <ProtocolFilters
            search={search}
            onSearchChange={setSearch}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />
        </Box>

        {/* TABELA */}
        <Box
          sx={{
            flex: 1,
            mt: 1,
            bgcolor: "background.paper",
            borderRadius: 2,
            border: "1px solid #e6e8eb",
            p: 1.5,
            overflow: "hidden",
          }}
        >
          <ProtocolTable
            rows={filteredProtocols}
            onEdit={handleEdit}
            onAnalyze={handleAnalyze}
            onDelete={handleDeleteClick}
            onRefresh={handleRefresh}
          />
        </Box>
      </Box>

      {/* DELETE */}
      <DeleteProtocolDialog
        open={deleteOpen}
        protocol={selectedProtocol?.protocol}
        title={selectedProtocol?.title}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      {/* EDIT */}
      <EditProtocolDialog
        open={dialogOpen}
        protocol={selected}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
      />
    </Box>
  );
}
