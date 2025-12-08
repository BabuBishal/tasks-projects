import { Breadcrumb } from '@/shared/ui/breadcrumb/Breadcrumb'
import AlertsNotifications from './_components/AlertsNotifications'
import { ViewTransition } from 'react'

import StatsContainer from './_components/StatsContainer'

import { useTranslations } from 'next-intl'

export default function DashboardPage() {
  const t = useTranslations('Dashboard')
  const tSidebar = useTranslations('Sidebar')

  return (
    <ViewTransition >
      <div className="flex h-full w-full flex-col gap-6">
        <Breadcrumb items={[{ label: tSidebar('dashboard'), href: '/dashboard' }]} />
        <div>
          <h1 className="text-foreground text-2xl font-bold">{t('title')}</h1>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>
        <StatsContainer />
        <AlertsNotifications />
      </div>
    </ViewTransition>
  )
}
