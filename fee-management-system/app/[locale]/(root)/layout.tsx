'use client'
import React, { ReactNode } from 'react'
import Sidebar from '@/shared/layout/sidebar'
import Navbar from '@/shared/layout/navbar/Navbar'
import { SessionProvider } from 'next-auth/react'

type DashboardLayoutProps = {
  children: ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  return (
    <SessionProvider>
      <div className="bg-background flex min-h-screen w-full">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className="flex min-h-screen flex-1 flex-col transition-all duration-300 ease-in-out md:ml-58">
          <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className="flex-1 overflow-x-hidden p-6 md:p-10">{children}</main>
        </div>
      </div>
    </SessionProvider>
  )
}

export default DashboardLayout
