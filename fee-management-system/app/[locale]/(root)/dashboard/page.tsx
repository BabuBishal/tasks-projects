import { Breadcrumb } from '@/shared/ui/breadcrumb/Breadcrumb'
import AlertsNotifications from './_components/AlertsNotifications'

import StatsContainer from './_components/StatsContainer'

export default function DashboardPage() {
  return (
    <div className="flex h-full w-full flex-col gap-6">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }]} />
      <div>
        <h1 className="text-foreground text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Fee Management System</p>
      </div>
      <StatsContainer />
      <AlertsNotifications />
    </div>
  )
}
