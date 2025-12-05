'use client'
import {
  GraduationCap,
  LayoutDashboard,
  School,
  Settings,
  Users,
  Wallet,
  FileText,
} from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}) => {
  const pathname = usePathname()
  const t = useTranslations('Sidebar')
  const locale = useLocale()

  const sidebarLinks = [
    { name: t('dashboard'), icon: LayoutDashboard, path: '/dashboard' },
    { name: t('programs'), icon: GraduationCap, path: '/programs' },
    { name: t('students'), icon: Users, path: '/students' },
    { name: t('payments'), icon: Wallet, path: '/payments' },
    { name: t('reports'), icon: FileText, path: '/reports' },
    
  ]
  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside
        className={`border-border bg-background fixed top-0 z-50 flex h-screen w-full max-w-58 min-w-40 flex-1 flex-col overflow-y-auto border-r transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="border-border flex h-16 items-center justify-center gap-2 border-b p-4">
          <School />
          <span className="font-semibold">{t('appTitle')}</span>
        </div>
        <div className="flex h-full flex-1 flex-col gap-3 p-5 text-sm">
          {sidebarLinks.map(link => {
            const Icon = link.icon
            const isActive = pathname.includes(link.path)

            return (
              <Link
                href={`/${locale}${link.path}`}
                key={link.name}
                className={`flex cursor-pointer items-center justify-start gap-2 rounded-sm p-2 ${
                  isActive
                    ? 'bg-secondary text-background'
                    : 'hover:bg-accent ease transition duration-200'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon className="h-4 w-4" />
                <span>{link.name}</span>
              </Link>
            )
          })}
        </div>
        <Link
          href={`/${locale}/settings`}
          className="border-border hover:bg-accent ease flex h-16 cursor-pointer items-center justify-start gap-2 border-t p-4 transition duration-200"
          onClick={() => setIsOpen(false)}
        >
          <Settings className="h-5 w-5" />
          <span className="font-medium">{t('settings')}</span>
        </Link>
      </aside>
    </>
  )
}

export default Sidebar
