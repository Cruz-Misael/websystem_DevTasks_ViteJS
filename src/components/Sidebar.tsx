import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import LogoutIcon from "@mui/icons-material/Logout";
import SavingsIcon from "@mui/icons-material/Savings";


interface SidebarProps {
  userName: string;
  accessLevel: "Admin" | "User";
  userPhotoUrl?: string;
  active?: string;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

export default function Sidebar({
  userName,
  accessLevel,
  userPhotoUrl,
  active,
  onNavigate,
  onLogout,
}: SidebarProps) {
  return (
    <Box
      width={260}
      height="100vh"
      display="flex"
      flexDirection="column"
      sx={{
        position: "sticky",
        top: 0,
        background:
          "linear-gradient(180deg, #8B2E2E 0%, #6F1F1F 100%)",
        color: "#fff",
        boxShadow: "4px 0 16px rgba(0,0,0,0.15)",
      }}
    >
      {/* Perfil */}
      <Box p={3} textAlign="center">
        <Avatar
          src={userPhotoUrl}
          sx={{
            width: 68,
            height: 68,
            margin: "0 auto 12px",
            bgcolor: "#fff",
            color: "#8B2E2E",
            fontWeight: 700,
            border: "3px solid rgba(255,255,255,0.3)",
          }}
        >
          {!userPhotoUrl && userName.charAt(0)}
        </Avatar>

        <Typography fontWeight={600}>
          {userName}
        </Typography>

        <Typography
          variant="caption"
          sx={{ opacity: 0.85 }}
        >
          {accessLevel}
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.15)" }} />

      {/* Navegação */}
      <List sx={{ px: 1, py: 1 }}>
        <SidebarItem
          icon={<DashboardIcon />}
          label="All Protocols"
          active={active === "dashboard"}
          onClick={() => onNavigate("/dashboard")}
        />

        {accessLevel === "Admin" && (
          <>
            <SidebarItem
              icon={<SavingsIcon />}
              label="Savings"
              active={active === "savings"}
              onClick={() => onNavigate("/savings")}
            />

            <SidebarItem
              icon={<BarChartIcon />}
              label="Analytics"
              active={active === "analytics"}
              onClick={() => onNavigate("/analytics")}
            />
          </>
        )}
      </List>

      <Box flex={1} />

      {/* Logout */}
      <Box px={2} pb={2}>
        <ListItemButton
          onClick={onLogout}
          sx={{
            borderRadius: "12px",
            backgroundColor: "rgba(255,255,255,0.08)",
            transition: "all .2s",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.15)",
              transform: "translateX(2px)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logoff" />
        </ListItemButton>
      </Box>

      {/* Footer */}
      <Box
        px={2}
        pb={2}
        textAlign="center"
        sx={{ opacity: 0.6 }}
      >
        <Typography variant="caption" display="block">
          Sebratel Tecnologia
        </Typography>
        <Typography variant="caption">
          Equipe de P&D
        </Typography>
      </Box>
    </Box>
  );
}

/* Item reutilizável */
function SidebarItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        position: "relative",
        borderRadius: "12px",
        mb: 0.5,
        pl: 2,
        backgroundColor: active
          ? "rgba(255,255,255,0.15)"
          : "transparent",
        transition: "all .2s",
        "&::before": active
          ? {
              content: '""',
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              height: "60%",
              width: "4px",
              borderRadius: "0 4px 4px 0",
              backgroundColor: "#fff",
            }
          : {},
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.12)",
          transform: "translateX(4px)",
        },
      }}
    >
      <ListItemIcon sx={{ color: "#fff", minWidth: 36 }}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
}
