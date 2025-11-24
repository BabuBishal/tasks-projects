"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Building2, Globe, DollarSign, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button/Button";
import { useToast } from "@/components/ui/toast";
import { Breadcrumb } from "@/components/ui/breadcrumb/Breadcrumb";
import { SystemSettings, SettingsUpdateInput } from "@/lib/@types";

export default function SettingsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { notify } = useToast();

  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [settingsForm, setSettingsForm] = useState<SettingsUpdateInput>({
    institutionName: "",
    institutionAddress: "",
    institutionPhone: "",
    institutionEmail: "",
    currency: "Rs.",
    dateFormat: "DD/MM/YYYY",
    timezone: "Asia/Kathmandu",
    receiptPrefix: "RCP",
    lateFeePercentage: 0,
    gracePeriodDays: 7,
    reminderDaysBefore: 3,
  });

  useEffect(() => {
    fetchSettings();
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        setIsAdmin(data.profile?.role === "Admin");
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
    }
  };

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/settings");
      if (!res.ok) throw new Error("Failed to fetch settings");

      const data = await res.json();
      setSettings(data);
      setSettingsForm({
        institutionName: data.institutionName || "",
        institutionAddress: data.institutionAddress || "",
        institutionPhone: data.institutionPhone || "",
        institutionEmail: data.institutionEmail || "",
        currency: data.currency || "Rs.",
        dateFormat: data.dateFormat || "DD/MM/YYYY",
        timezone: data.timezone || "Asia/Kathmandu",
        receiptPrefix: data.receiptPrefix || "RCP",
        lateFeePercentage: data.lateFeePercentage || 0,
        gracePeriodDays: data.gracePeriodDays || 7,
        reminderDaysBefore: data.reminderDaysBefore || 3,
      });
    } catch (error) {
      notify({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to load settings",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAdmin) {
      notify({
        title: "Error",
        description: "Only administrators can update settings",
        type: "error",
      });
      return;
    }

    try {
      setUpdating(true);
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settingsForm),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update settings");
      }

      notify({
        title: "Success",
        description: "Settings updated successfully",
        type: "success",
      });

      await fetchSettings();
    } catch (error) {
      notify({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update settings",
        type: "error",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="w-full h-full flex flex-col gap-6">
        <Breadcrumb items={[{ label: "Settings", href: "/settings" }]} />
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold text-primary mb-2">
            Access Denied
          </h2>
          <p className="text-muted">
            Only administrators can access system settings.
          </p>
          <Button
            variant="primary"
            onClick={() => router.push("/dashboard")}
            className="mt-4"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <Breadcrumb items={[{ label: "Settings", href: "/settings" }]} />

      {/* Header */}
      <div>
        <h1 className="text-primary text-2xl font-bold">System Settings</h1>
        <p className="text-muted text-sm">
          Configure institution and system preferences
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Institution Information */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-primary">
              Institution Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-secondary mb-2">
                Institution Name
              </label>
              <input
                type="text"
                value={settingsForm.institutionName}
                onChange={(e) =>
                  setSettingsForm({
                    ...settingsForm,
                    institutionName: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-secondary mb-2">
                Address
              </label>
              <input
                type="text"
                value={settingsForm.institutionAddress}
                onChange={(e) =>
                  setSettingsForm({
                    ...settingsForm,
                    institutionAddress: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={settingsForm.institutionPhone}
                onChange={(e) =>
                  setSettingsForm({
                    ...settingsForm,
                    institutionPhone: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={settingsForm.institutionEmail}
                onChange={(e) =>
                  setSettingsForm({
                    ...settingsForm,
                    institutionEmail: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* System Preferences */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-primary">
              System Preferences
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Currency Symbol
              </label>
              <input
                type="text"
                value={settingsForm.currency}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, currency: e.target.value })
                }
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Date Format
              </label>
              <select
                value={settingsForm.dateFormat}
                onChange={(e) =>
                  setSettingsForm({
                    ...settingsForm,
                    dateFormat: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Timezone
              </label>
              <select
                value={settingsForm.timezone}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, timezone: e.target.value })
                }
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Asia/Kathmandu">Asia/Kathmandu (NPT)</option>
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
          </div>
        </div>

        {/* Fee & Payment Settings */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-primary">
              Fee & Payment Settings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Receipt Prefix
              </label>
              <input
                type="text"
                value={settingsForm.receiptPrefix}
                onChange={(e) =>
                  setSettingsForm({
                    ...settingsForm,
                    receiptPrefix: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted mt-1">e.g., RCP-2025-001</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Late Fee Percentage (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={settingsForm.lateFeePercentage}
                onChange={(e) =>
                  setSettingsForm({
                    ...settingsForm,
                    lateFeePercentage: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Grace Period (Days)
              </label>
              <input
                type="number"
                min="0"
                value={settingsForm.gracePeriodDays}
                onChange={(e) =>
                  setSettingsForm({
                    ...settingsForm,
                    gracePeriodDays: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted mt-1">
                Days after due date before marking overdue
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Reminder Days Before Due
              </label>
              <input
                type="number"
                min="0"
                value={settingsForm.reminderDaysBefore}
                onChange={(e) =>
                  setSettingsForm({
                    ...settingsForm,
                    reminderDaysBefore: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted mt-1">
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
            {updating ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}
