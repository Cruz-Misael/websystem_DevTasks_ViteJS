import { Box, Typography } from "@mui/material";

export default function Analytics() {
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
      Power BI Dashboard
    </Typography>

    <Typography variant="body2" color="text.secondary">
      Deadline control dashboard
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
          title="Power BI Analytics"
          src="https://app.powerbi.com/view?r=eyJrIjoiZmFlYjIzMzItMDc1Yy00OTAxLWJmOWItZGZjNzE0NDM4MDcxIiwidCI6IjAyMmVlMDEzLTcyMGMtNGJlYi1hMTY2LWFhZjBhZTI2ODE2NiJ9"
          width="100%"
          height="100%"
          style={{ border: "none" }}
          allowFullScreen
        />
      </Box>
    </Box>
  );
}
