import { Outlet } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Sidebar from "./shared/templates/sidebar/Sidebar";
import { ToastProvider } from "../../../packages/ui/src/components/toast";
import Header from "./shared/templates/header/Header";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <ToastProvider>
      <div className="App">
        <Header onMenuClick={toggleSidebar} />
        <main className="main">
          <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
          <div className="outlet-container">
            <Outlet />
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}

export default App;
