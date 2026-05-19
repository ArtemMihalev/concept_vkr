import { useState } from "react";
import { AuthScreen } from "./auth/AuthScreen.jsx";
import { AppShell } from "./layout/AppShell.jsx";
import { getShellConfig } from "./navigation/roleConfig.js";
import { IrkDashboard } from "./irk/IrkDashboard.jsx";
import { InstrumentsList } from "./irk/InstrumentsList.jsx";
import { IrkOperations } from "./irk/operations/IrkOperations.jsx";
import { ReportsPage } from "./reports/ReportsPage.jsx";
import { WarehouseDashboard } from "./tool-warehouse/WarehouseDashboard.jsx";
import { InventoryList } from "./tool-warehouse/InventoryList.jsx";
import { WarehouseMovements } from "./tool-warehouse/WarehouseMovements.jsx";
import { LabDashboard } from "./laboratory/LabDashboard.jsx";
import { VerificationsList } from "./laboratory/VerificationsList.jsx";

export function App() {
  const [role, setRole] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);

  if (!role || !user) {
    return (
      <AuthScreen
        onAuthSuccess={(authUser) => {
          setRole(authUser.role);
          setUser(authUser);
          setActiveTab("dashboard");
        }}
      />
    );
  }

  const shell = getShellConfig(role);

  function renderContent() {
    if (role === "irk") {
      switch (activeTab) {
        case "dashboard":
          return <IrkDashboard />;
        case "instruments":
          return <InstrumentsList />;
        case "operations":
          return <IrkOperations />;
        case "reports":
          return <ReportsPage />;
        default:
          return <IrkDashboard />;
      }
    }
    if (role === "tool-warehouse") {
      switch (activeTab) {
        case "dashboard":
          return <WarehouseDashboard />;
        case "inventory":
          return <InventoryList />;
        case "operations":
          return <WarehouseMovements />;
        case "reports":
          return <ReportsPage />;
        default:
          return <WarehouseDashboard />;
      }
    }
    if (role === "laboratory") {
      switch (activeTab) {
        case "dashboard":
          return <LabDashboard />;
        case "verifications":
          return <VerificationsList />;
        case "reports":
          return <ReportsPage />;
        default:
          return <LabDashboard />;
      }
    }
    return null;
  }

  function handleLogout() {
    localStorage.removeItem("authToken");
    setRole(null);
    setUser(null);
  }

  return (
    <AppShell
      title={shell.title}
      userDisplayName={user.fullName || shell.userName}
      sidebarOpen={sidebarOpen}
      onToggleSidebar={() => setSidebarOpen((v) => !v)}
      tabs={shell.tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={handleLogout}
    >
      {renderContent()}
    </AppShell>
  );
}

export default App;
