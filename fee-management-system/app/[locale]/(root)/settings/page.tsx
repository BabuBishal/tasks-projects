'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/button/Button'
import { Breadcrumb } from '@/shared/ui/breadcrumb/Breadcrumb'
import { SettingsSkeleton } from './_components/SettingsSkeleton'
import { useSettingsQuery } from '@/app/[locale]/(root)/settings/_hooks'
import { useProfileQuery } from '@/app/[locale]/(root)/profile/_hooks'
import SettingsForm from './_components/SettingsForm'

export default function SettingsPage() {
  const router = useRouter()

  const { data: settings, isLoading: settingsLoading } = useSettingsQuery()
  const { data: profileData } = useProfileQuery()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isAdmin = (profileData as any)?.profile?.role === 'Admin'

  if (settingsLoading) {
    return <SettingsSkeleton />
  }

  if (!isAdmin) {
    return (
      <div className="flex h-full w-full flex-col gap-6">
        <Breadcrumb items={[{ label: 'Settings', href: '/settings' }]} />
        <div className="bg-card border-border rounded-lg border p-8 text-center">
          <h2 className="text-primary mb-2 text-xl font-semibold">Access Denied</h2>
          <p className="text-muted">Only administrators can access system settings.</p>
          <Button variant="primary" onClick={() => router.push('/dashboard')} className="mt-4">
            Go to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full flex-col gap-6">
      <Breadcrumb items={[{ label: 'Settings', href: '/settings' }]} />

      <div>
        <h1 className="text-primary text-2xl font-bold">System Settings</h1>
        <p className="text-muted text-sm">Configure institution and system preferences</p>
      </div>

      {settings && <SettingsForm settings={settings} />}
    </div>
  )
}
