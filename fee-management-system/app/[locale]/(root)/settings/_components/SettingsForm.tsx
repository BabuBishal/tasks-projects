'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, Globe, DollarSign } from 'lucide-react'
import { Button } from '@/shared/ui/button/Button'
import { useToast } from '@/shared/ui/toast'
import { SettingsUpdateInput } from '@/lib/types'
import { useUpdateSettingsMutation } from '@/app/[locale]/(root)/settings/_hooks'
import { SettingsResponse } from '@/lib/types/api'

interface SettingsFormProps {
  settings: SettingsResponse
}

export default function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter()
  const { notify } = useToast()
  const updateSettingsMutation = useUpdateSettingsMutation()

  // Initialize state from props - safe because we only render this component when settings is available
  const [settingsForm, setSettingsForm] = useState<SettingsUpdateInput>({
    institutionName: settings.institutionName || '',
    institutionAddress: settings.institutionAddress || '',
    institutionPhone: settings.institutionPhone || '',
    institutionEmail: settings.institutionEmail || '',
    currency: settings.currency || 'Rs.',
    dateFormat: settings.dateFormat || 'DD/MM/YYYY',
    timezone: settings.timezone || 'Asia/Kathmandu',
    receiptPrefix: settings.receiptPrefix || 'RCP',
    lateFeePercentage: settings.lateFeePercentage || 0,
    gracePeriodDays: settings.gracePeriodDays || 7,
    reminderDaysBefore: settings.reminderDaysBefore || 3,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await updateSettingsMutation.mutateAsync(settingsForm)

      notify({
        title: 'Success',
        description: 'Settings updated successfully',
        type: 'success',
      })
    } catch (error) {
      notify({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update settings',
        type: 'error',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div className="bg-card border-border rounded-lg border p-6">
        <div className="mb-4 flex items-center gap-2">
          <Globe className="text-primary h-5 w-5" />
          <h2 className="text-primary text-lg font-semibold">System Preferences</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <label className="text-secondary mb-2 block text-sm font-medium">Currency Symbol</label>
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

      <div className="bg-card border-border rounded-lg border p-6">
        <div className="mb-4 flex items-center gap-2">
          <DollarSign className="text-primary h-5 w-5" />
          <h2 className="text-primary text-lg font-semibold">Fee & Payment Settings</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="text-secondary mb-2 block text-sm font-medium">Receipt Prefix</label>
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

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={updateSettingsMutation.isPending}>
          {updateSettingsMutation.isPending ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </form>
  )
}
