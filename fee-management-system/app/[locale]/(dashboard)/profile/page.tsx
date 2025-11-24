"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button/Button";
import { useToast } from "@/components/ui/toast";
import { Breadcrumb } from "@/components/ui/breadcrumb/Breadcrumb";
import {
  UserWithProfile,
  ProfileUpdateInput,
  PasswordChangeInput,
} from "@/lib/@types";

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { notify } = useToast();

  const [profile, setProfile] = useState<UserWithProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "password">("info");

  // Profile form state
  const [profileForm, setProfileForm] = useState<ProfileUpdateInput>({
    name: "",
    email: "",
    phone: "",
    position: "",
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState<PasswordChangeInput>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/profile");
      if (!res.ok) throw new Error("Failed to fetch profile");

      const data = await res.json();
      setProfile(data);
      setProfileForm({
        name: data.name || "",
        email: data.email || "",
        phone: data.profile?.phone || "",
        position: data.profile?.position || "",
      });
    } catch (error) {
      notify({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to load profile",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileForm),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update profile");
      }

      notify({
        title: "Success",
        description: "Profile updated successfully",
        type: "success",
      });

      await fetchProfile();
    } catch (error) {
      notify({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update profile",
        type: "error",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      notify({
        title: "Error",
        description: "New passwords do not match",
        type: "error",
      });
      return;
    }

    try {
      setUpdating(true);
      const res = await fetch("/api/profile/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwordForm),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to change password");
      }

      notify({
        title: "Success",
        description: "Password changed successfully",
        type: "success",
      });

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      notify({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to change password",
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

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <Breadcrumb items={[{ label: "Profile", href: "/profile" }]} />

      {/* Header */}
      <div>
        <h1 className="text-primary text-2xl font-bold">My Profile</h1>
        <p className="text-muted text-sm">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Summary Card */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-10 h-10 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-primary">
              {profile?.name}
            </h2>
            <p className="text-sm text-muted">{profile?.email}</p>
            <p className="text-xs text-muted mt-1">
              {profile?.profile?.role || "Staff"} • Member since{" "}
              {new Date(profile?.createdAt || "").toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab("info")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "info"
              ? "text-primary border-b-2 border-primary"
              : "text-muted hover:text-secondary"
          }`}
        >
          Profile Information
        </button>
        <button
          onClick={() => setActiveTab("password")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "password"
              ? "text-primary border-b-2 border-primary"
              : "text-muted hover:text-secondary"
          }`}
        >
          Change Password
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-card border border-border rounded-lg p-6">
        {activeTab === "info" && (
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Edit Profile Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Position/Title
                </label>
                <input
                  type="text"
                  value={profileForm.position}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, position: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={updating}>
                {updating ? "Updating..." : "Save Changes"}
              </Button>
            </div>
          </form>
        )}

        {activeTab === "password" && (
          <form onSubmit={handlePasswordChange} className="space-y-6 max-w-md">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Change Password
            </h3>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    currentPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                New Password
              </label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                required
                minLength={6}
              />
              <p className="text-xs text-muted mt-1">
                Must be at least 6 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setPasswordForm({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  })
                }
              >
                Clear
              </Button>
              <Button type="submit" variant="primary" disabled={updating}>
                {updating ? "Changing..." : "Change Password"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
