import { Box, Typography } from "@mui/material";

export default function Savings() {
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
            Savings
            </Typography>

            <Typography variant="body2" color="text.secondary">
            Project earnings management sheet
            </Typography>
        </Box>

        {/* CONTAINER PRINCIPAL */}
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
        <iframe
          title="Savings Spreadsheet"
          src="https://docs.google.com/spreadsheets/d/1pwFXHvr_zatLuk9ffEus1pyE5xsx66QmKDDsPFMHDfw/preview"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      </Box>
    </Box>
  );
}
