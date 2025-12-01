'use client'

import LanguageSwitcher from '@/components/layout/navbar/language-switcher/LanguageSwitcher'
import { Bell, Menu } from 'lucide-react'
import UserNav from './UserNav'
import ThemeToggle from './theme-toggle/ThemeToggle'

const Navbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
  return (
    <nav className="border-border dark:border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b px-5 py-4 backdrop-blur">
      <div className="align-start">
        <Menu className="h-5 w-5 cursor-pointer md:hidden" onClick={onMenuClick} />
      </div>
      <div className="flex items-center justify-center gap-3">
        <LanguageSwitcher />
        <ThemeToggle />
        <Bell className="h-5 w-5 cursor-pointer" />
        <UserNav />
      </div>
    </nav>
  )
}

export default Navbar
