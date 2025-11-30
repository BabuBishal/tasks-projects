'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Building2, Globe, DollarSign, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button/Button'
import { useToast } from '@/components/ui/toast'
import { Breadcrumb } from '@/components/ui/breadcrumb/Breadcrumb'
import { SystemSettings, SettingsUpdateInput } from '@/lib/types'
import { SettingsSkeleton } from './_components/SettingsSkeleton'

export default function SettingsPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { notify } = useToast()

  const [settings, setSettings] = useState<SystemSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const [settingsForm, setSettingsForm] = useState<SettingsUpdateInput>({
    institutionName: '',
    institutionAddress: '',
    institutionPhone: '',
    institutionEmail: '',
    currency: 'Rs.',
    dateFormat: 'DD/MM/YYYY',
    timezone: 'Asia/Kathmandu',
    receiptPrefix: 'RCP',
    lateFeePercentage: 0,
    gracePeriodDays: 7,
    reminderDaysBefore: 3,
  })

  useEffect(() => {
    fetchSettings()
    checkAdminStatus()
  }, [])

  const checkAdminStatus = async () => {
    try {
      const res = await fetch('/api/profile')
      if (res.ok) {
        const data = await res.json()
        setIsAdmin(data.profile?.role === 'Admin')
      }
    } catch (error) {
      console.error('Error checking admin status:', error)
    }
  }

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/settings')
      if (!res.ok) throw new Error('Failed to fetch settings')

      const data = await res.json()
      setSettings(data)
      setSettingsForm({
        institutionName: data.institutionName || '',
        institutionAddress: data.institutionAddress || '',
        institutionPhone: data.institutionPhone || '',
        institutionEmail: data.institutionEmail || '',
        currency: data.currency || 'Rs.',
        dateFormat: data.dateFormat || 'DD/MM/YYYY',
        timezone: data.timezone || 'Asia/Kathmandu',
        receiptPrefix: data.receiptPrefix || 'RCP',
        lateFeePercentage: data.lateFeePercentage || 0,
        gracePeriodDays: data.gracePeriodDays || 7,
        reminderDaysBefore: data.reminderDaysBefore || 3,
      })
    } catch (error) {
      notify({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to load settings',
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isAdmin) {
      notify({
        title: 'Error',
        description: 'Only administrators can update settings',
        type: 'error',
      })
      return
    }

    try {
      setUpdating(true)
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsForm),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to update settings')
      }

      notify({
        title: 'Success',
        description: 'Settings updated successfully',
        type: 'success',
      })

      await fetchSettings()
    } catch (error) {
      notify({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update settings',
        type: 'error',
      })
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
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

      {/* Header */}
      <div>
        <h1 className="text-primary text-2xl font-bold">System Settings</h1>
        <p className="text-muted text-sm">Configure institution and system preferences</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Institution Information */}
        <div className="bg-card border-border rounded-lg border p-6">
          <div className="mb-4 flex items-center gap-2">
            <Building2 className="text-primary h-5 w-5" />
            <h2 className="text-primary text-lg font-semibold">Institution Information</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="text-secondary mb-2 block text-sm font-medium">
                Institution Name
              </label>
              <input
                type="text"
                value={settingsForm.institutionName}
                onChange={e =>
                  setSettingsForm({
                    ...settingsForm,
                    institutionName: e.target.value,
                  })
                }
                className="border-border bg-background text-primary focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-secondary mb-2 block text-sm font-medium">Address</label>
              <input
                type="text"
                value={settingsForm.institutionAddress}
                onChange={e =>
                  setSettingsForm({
                    ...settingsForm,
                    institutionAddress: e.target.value,
                  })
                }
                className="border-border bg-background text-primary focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-secondary mb-2 block text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                value={settingsForm.institutionPhone}
                onChange={e =>
                  setSettingsForm({
                    ...settingsForm,
                    institutionPhone: e.target.value,
                  })
                }
                className="border-border bg-background text-primary focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-secondary mb-2 block text-sm font-medium">Email Address</label>
              <input
                type="email"
                value={settingsForm.institutionEmail}
                onChange={e =>
                  setSettingsForm({
                    ...settingsForm,
                    institutionEmail: e.target.value,
                  })
                }
                className="border-border bg-background text-primary focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* System Preferences */}
        <div className="bg-card border-border rounded-lg border p-6">
          <div className="mb-4 flex items-center gap-2">
            <Globe className="text-primary h-5 w-5" />
            <h2 className="text-primary text-lg font-semibold">System Preferences</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className="text-secondary mb-2 block text-sm font-medium">
                Currency Symbol
              </label>
              <input
                type="text"
                value={settingsForm.currency}
                onChange={e => setSettingsForm({ ...settingsForm, currency: e.target.value })}
                className="border-border bg-background text-primary focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-secondary mb-2 block text-sm font-medium">Date Format</label>
              <select
                value={settingsForm.dateFormat}
                onChange={e =>
                  setSettingsForm({
                    ...settingsForm,
                    dateFormat: e.target.value,
                  })
                }
                className="border-border bg-background text-primary focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>

            <div>
              <label className="text-secondary mb-2 block text-sm font-medium">Timezone</label>
              <select
                value={settingsForm.timezone}
                onChange={e => setSettingsForm({ ...settingsForm, timezone: e.target.value })}
                className="border-border bg-background text-primary focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
              >
                <option value="Asia/Kathmandu">Asia/Kathmandu (NPT)</option>
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
          </div>
        </div>

        {/* Fee & Payment Settings */}
        <div className="bg-card border-border rounded-lg border p-6">
          <div className="mb-4 flex items-center gap-2">
            <DollarSign className="text-primary h-5 w-5" />
            <h2 className="text-primary text-lg font-semibold">Fee & Payment Settings</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="text-secondary mb-2 block text-sm font-medium">
                Receipt Prefix
              </label>
              <input
                type="text"
                value={settingsForm.receiptPrefix}
                onChange={e =>
                  setSettingsForm({
                    ...settingsForm,
                    receiptPrefix: e.target.value,
                  })
                }
                className="border-border bg-background text-primary focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
              />
              <p className="text-muted mt-1 text-xs">e.g., RCP-2025-001</p>
            </div>

            <div>
              <label className="text-secondary mb-2 block text-sm font-medium">
                Late Fee Percentage (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={settingsForm.lateFeePercentage}
                onChange={e =>
                  setSettingsForm({
                    ...settingsForm,
                    lateFeePercentage: parseInt(e.target.value) || 0,
                  })
                }
                className="border-border bg-background text-primary focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-secondary mb-2 block text-sm font-medium">
                Grace Period (Days)
              </label>
              <input
                type="number"
                min="0"
                value={settingsForm.gracePeriodDays}
                onChange={e =>
                  setSettingsForm({
                    ...settingsForm,
                    gracePeriodDays: parseInt(e.target.value) || 0,
                  })
                }
                className="border-border bg-background text-primary focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
              />
              <p className="text-muted mt-1 text-xs">Days after due date before marking overdue</p>
            </div>

            <div>
              <label className="text-secondary mb-2 block text-sm font-medium">
                Reminder Days Before Due
              </label>
              <input
                type="number"
                min="0"
                value={settingsForm.reminderDaysBefore}
                onChange={e =>
                  setSettingsForm({
                    ...settingsForm,
                    reminderDaysBefore: parseInt(e.target.value) || 0,
                  })
                }
                className="border-border bg-background text-primary focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
              />
              <p className="text-muted mt-1 text-xs">
                Send payment reminders this many days before due date
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={updating}>
            {updating ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </form>
    </div>
  )
}
