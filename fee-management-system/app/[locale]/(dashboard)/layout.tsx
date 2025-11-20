"use client";
import React, { ReactNode } from "react";
import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar/Navbar";
import { SessionProvider } from "next-auth/react";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <SessionProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className="flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out md:ml-58">
          <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className="flex-1 p-6 md:p-10 overflow-x-hidden ">
            {children}
          </main>
        </div>
      </div>
    </SessionProvider>
  );
};

export default DashboardLayout;
