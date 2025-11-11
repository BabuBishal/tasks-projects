import { Outlet } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="App">
      <Header onMenuClick={toggleSidebar} />
      <main className="main">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        <div className="outlet-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;
