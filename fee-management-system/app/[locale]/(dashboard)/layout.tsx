import React, { ReactNode } from "react";
import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="w-full  flex flex-col gap-1 flex-1 ml-0 sm:ml-58 transition-transform ease duration-200">
        <Navbar />
        <main className="w-full h-full p-5">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
