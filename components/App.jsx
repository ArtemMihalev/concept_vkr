import { useEffect, useState } from "react";
import { AuthScreen } from "./auth/AuthScreen.jsx";
import { AppShell } from "./layout/AppShell.jsx";
import { getShellConfig, getDefaultTab } from "./navigation/roleConfig.js";
import { api, setAuthToken } from "./api/client.js";
import { IrkDashboard } from "./irk/IrkDashboard.jsx";
import { InstrumentsList } from "./irk/InstrumentsList.jsx";
import { IrkOperations } from "./irk/operations/IrkOperations.jsx";
import { IrkMetrology } from "./irk/IrkMetrology.jsx";
import { IrkDocuments } from "./irk/IrkDocuments.jsx";
import { InventoryList } from "./tool-warehouse/InventoryList.jsx";
import { OrdersList } from "./tool-warehouse/OrdersList.jsx";
import { WarehouseMovements } from "./tool-warehouse/WarehouseMovements.jsx";
import { LabDashboard } from "./laboratory/LabDashboard.jsx";
import { VerificationOverview } from "./laboratory/VerificationOverview.jsx";
import { VerificationJournal } from "./laboratory/VerificationJournal.jsx";
import { LabDocuments } from "./laboratory/LabDocuments.jsx";

export function App() {
  const [role, setRole] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [bootstrapping, setBootstrapping] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setBootstrapping(false);
      return;
    }
    api
      .get("/api/me")
      .then((profile) => {
        setUser(profile);
        setRole(profile.role);
        setActiveTab(getDefaultTab(profile.role));
      })
      .catch(() => setAuthToken(null))
      .finally(() => setBootstrapping(false));
  }, []);

  if (bootstrapping) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Загрузка...</p>
      </div>
    );
  }

  if (!role || !user) {
    return (
      <AuthScreen
        onAuthSuccess={(authUser) => {
          if (authUser.token) setAuthToken(authUser.token);
          setRole(authUser.role);
          setUser(authUser);
          setActiveTab(getDefaultTab(authUser.role));
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
        case "metrology":
          return <IrkMetrology />;
        case "documents":
          return <IrkDocuments />;
        default:
          return <IrkDashboard />;
      }
    }
    if (role === "tool-warehouse") {
      switch (activeTab) {
        case "inventory":
          return <InventoryList />;
        case "orders":
          return <OrdersList />;
        case "movements":
          return <WarehouseMovements />;
        default:
          return <InventoryList />;
      }
    }
    if (role === "laboratory") {
      switch (activeTab) {
        case "dashboard":
          return <LabDashboard onNavigate={setActiveTab} />;
        case "verifications":
          return <VerificationOverview />;
        case "journal":
          return <VerificationJournal />;
        case "documents":
          return <LabDocuments />;
        default:
          return <LabDashboard onNavigate={setActiveTab} />;
      }
    }
    return null;
  }

  function handleLogout() {
    setAuthToken(null);
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
