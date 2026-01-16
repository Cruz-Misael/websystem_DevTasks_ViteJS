import {
  Box,
  TextField,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  statusFilter: "pending" | "completed" | "all";
  onStatusFilterChange: (v: "pending" | "completed" | "all") => void;
}


export function ProtocolFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: Props) {

  return (
    <Box
      display="flex"
      gap={1.5}
      alignItems="center"
      sx={{
        backgroundColor: "#f7f8fa",
        padding: "8px 12px",
        borderRadius: "12px",
        width: "fit-content",
      }}
    >
      <TextField
        placeholder="Buscar protocolo"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        size="small"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
        sx={{
          width: 220,
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            backgroundColor: "#fff",
          },
        }}
      />

      <TextField
        select
        size="small"
        value={statusFilter}
        onChange={(e) =>
          onStatusFilterChange(e.target.value as any)
        }
        sx={{
          minWidth: 170,
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            backgroundColor: "#fff",
          },
        }}
      >
        <MenuItem value="pending">Pendentes</MenuItem>
        <MenuItem value="completed">Analisados</MenuItem>
        <MenuItem value="all">Todos</MenuItem>
      </TextField>

    </Box>
  );
}
