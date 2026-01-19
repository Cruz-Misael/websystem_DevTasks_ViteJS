import logo from "../assets/logo_personalizado.png"

import {
  Box,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  userName?: string;
  userEmail?: string;
  accessLevel?: string;
  userPhotoUrl?: string;
  logoUrl?: string;
}

export function Header({
  title = "Deadline Management Platform",
  subtitle = "Technology Team",
  userName,
  userEmail,
  accessLevel,
  userPhotoUrl,
  logoUrl = logo,
}: HeaderProps) {
  const displayName = userName || userEmail || "User";

  return (
    <Box
      height={72}
      px={3}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        backdropFilter: "blur(8px)",
        background: "rgba(255,255,255,0.9)",
        borderBottom: "1px solid #e6e8eb",
        boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
      }}
    >
      {/* Esquerda */}
      <Box display="flex" alignItems="center" gap={2}>
        {logoUrl && (
          <Box
            component="img"
            src={logoUrl}
            alt="Logo"
            sx={{
              height: 50,
              transition: "transform .2s",
              "&:hover": { transform: "scale(1.05)" },
            }}
          />
        )}

        <Box>
          <Typography
            variant="h6"
            fontWeight={700}
            lineHeight={1.2}
            sx={{
              color: "#8B2E2E",
              letterSpacing: "0.3px",
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            {subtitle}
          </Typography>
        </Box>
      </Box>

      {/* Direita */}
      <Box display="flex" alignItems="center" gap={3}>
        <Box textAlign="right">
          <Typography
            variant="body2"
            fontWeight={600}
          >
            Sebratel Telecom
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
          >
            Devtasks Platform
          </Typography>
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box
          display="flex"
          alignItems="center"
          gap={1.5}
          sx={{
            cursor: "pointer",
            px: 1,
            py: 0.5,
            borderRadius: 2,
            transition: "background .2s",
            "&:hover": {
              backgroundColor: "#f5f6f8",
            },
          }}
        >
          <Box textAlign="right">
            <Typography
              variant="body2"
              fontWeight={600}
            >
              {displayName}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
            >
              {accessLevel}
            </Typography>
          </Box>

          <Avatar
            src={userPhotoUrl}
            sx={{
              width: 38,
              height: 38,
              bgcolor: "#8B2E2E",
              border: "2px solid #fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            {!userPhotoUrl && displayName.charAt(0)}
          </Avatar>
        </Box>
      </Box>
    </Box>
  );
}
