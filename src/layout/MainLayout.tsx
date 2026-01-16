import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Header } from "../components/Header";

export default function MainLayout() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <Sidebar
        userName="João Silva"
        accessLevel="Admin"
        onNavigate={(path) => navigate(path)}
        onLogout={() => console.log("logout")}
      />

      <div className="app-main">
        <Header />

        <div className="app-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
