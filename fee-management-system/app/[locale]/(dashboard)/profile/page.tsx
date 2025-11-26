"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  Camera,
  Upload,
  Edit,
  Key,
} from "lucide-react";
import { Button } from "@/components/ui/button/Button";
import { useToast } from "@/components/ui/toast";
import { Breadcrumb } from "@/components/ui/breadcrumb/Breadcrumb";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet/sheet";
import { ProfileUpdateInput, PasswordChangeInput } from "@/lib/@types";
import Image from "next/image";
import { useProfile } from "@/lib/services/queries/useProfile.queries";
import {
  useUpdateProfile,
  useChangePassword,
  useUploadProfilePhoto,
} from "@/lib/services/mutations/useProfileMutation";

export default function ProfilePage() {
  const { notify } = useToast();

  // React Query hooks
  const { data: profile, isLoading } = useProfile();
  const updateProfileMutation = useUpdateProfile();
  const changePasswordMutation = useChangePassword();
  const uploadPhotoMutation = useUploadProfilePhoto();

  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  // Profile form state
  const [profileForm, setProfileForm] = useState<ProfileUpdateInput>({
    name: profile?.name ?? "",
    email: profile?.email ?? "",
    phone: profile?.profile?.phone ?? "",
    position: profile?.profile?.position ?? "",
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState<PasswordChangeInput>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Profile photo state
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfileMutation.mutateAsync(profileForm);
      notify({
        title: "Success",
        description: "Profile updated successfully",
        type: "success",
      });
      setEditProfileOpen(false);
    } catch (error) {
      notify({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update profile",
        type: "error",
      });
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      notify({
        title: "Error",
        description: "Passwords do not match",
        type: "error",
      });
      return;
    }

    try {
      await changePasswordMutation.mutateAsync(passwordForm);
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
      setChangePasswordOpen(false);
    } catch (error) {
      notify({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to change password",
        type: "error",
      });
    }
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        notify({
          title: "Error",
          description: "Please select an image file",
          type: "error",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        notify({
          title: "Error",
          description: "Image size should be less than 5MB",
          type: "error",
        });
        return;
      }

      setSelectedPhoto(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = async () => {
    if (!selectedPhoto) return;

    try {
      await uploadPhotoMutation.mutateAsync(selectedPhoto);
      notify({
        title: "Success",
        description: "Profile photo updated successfully",
        type: "success",
      });
      setSelectedPhoto(null);
      setPhotoPreview(null);
    } catch (error) {
      notify({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to upload photo",
        type: "error",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-error">Failed to load profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-8 pb-8">
      <Breadcrumb items={[{ label: "Profile", href: "/profile" }]} />

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-primary text-3xl font-bold">My Profile</h1>
        <p className="text-muted text-base">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Summary Card */}
      <div className="bg-card border border-border rounded-xl shadow-sm p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Profile Photo with Upload */}
          <div className="relative group">
            <div className="w-28 h-28 p-1 rounded-full overflow-hidden bg-transparent flex items-center justify-center border-2 border-border hover:border-primary transition-colors">
              {photoPreview || profile?.profile?.profilePicture ? (
                <Image
                  src={photoPreview || profile?.profile?.profilePicture || ""}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                  width={112}
                  height={112}
                />
              ) : (
                <User className="w-14 h-14 text-primary" />
              )}
            </div>
            <label
              htmlFor="photo-upload"
              className="absolute bottom-1 right-1 p-2.5 bg-primary rounded-full cursor-pointer hover:bg-primary/90 transition-colors shadow-lg"
            >
              <Camera className="w-4 h-4 text-background" />
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoSelect}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-semibold text-primary mb-1">
              {profile?.name}
            </h2>
            <p className="text-base text-muted flex gap-2 items-center mb-2">
              <Mail className="w-4 h-4" /> {profile?.email}
            </p>
            <p className="text-sm text-muted">
              {profile?.profile?.role || "Staff"} • Member since{" "}
              {new Date(profile?.createdAt || "").toLocaleDateString()}
            </p>

            {/* Upload button when photo is selected */}
            {selectedPhoto && (
              <div className="mt-4 flex gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handlePhotoUpload}
                  disabled={uploadPhotoMutation.isPending}
                  className="flex items-center gap-2"
                >
                  <Upload className="w-3 h-3" />
                  {uploadPhotoMutation.isPending
                    ? "Uploading..."
                    : "Upload Photo"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedPhoto(null);
                    setPhotoPreview(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>

          {!selectedPhoto && (
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                variant="primary"
                onClick={() => setEditProfileOpen(true)}
                className="flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </Button>
              <Button
                variant="outline"
                onClick={() => setChangePasswordOpen(true)}
                className="flex items-center justify-center gap-2"
              >
                <Key className="w-4 h-4" />
                Change Password
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Read-only Profile Information */}
      <div className="bg-card border border-border rounded-xl shadow-sm p-8">
        <h3 className="text-xl font-semibold text-primary mb-8">
          Profile Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-950 rounded-xl">
              <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-muted mb-1">Full Name</p>
              <p className="text-base font-semibold text-primary">
                {profile?.name || "Not set"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-950 rounded-xl">
              <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-muted mb-1">
                Email Address
              </p>
              <p className="text-base font-semibold text-primary truncate">
                {profile?.email || "Not set"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-950 rounded-xl">
              <Phone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-muted mb-1">
                Phone Number
              </p>
              <p className="text-base font-semibold text-primary">
                {profile?.profile?.phone || "Not set"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-950 rounded-xl">
              <Briefcase className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-muted mb-1">
                Position/Title
              </p>
              <p className="text-base font-semibold text-primary">
                {profile?.profile?.position || "Not set"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-100 dark:bg-red-950 rounded-xl">
              <Briefcase className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-muted mb-1">Role</p>
              <p className="text-base font-semibold text-primary">
                {profile?.profile?.role || "Staff"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-950 rounded-xl">
              <Calendar className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-muted mb-1">
                Member Since
              </p>
              <p className="text-base font-semibold text-primary">
                {new Date(profile?.createdAt || "").toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Sheet */}
      <Sheet open={editProfileOpen} onOpenChange={setEditProfileOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-xl overflow-y-auto p-0"
        >
          <div className="px-6 pt-6 pb-4 border-b border-border">
            <SheetHeader>
              <SheetTitle className="text-2xl">Edit Profile</SheetTitle>
              <SheetDescription className="text-base mt-2">
                Update your profile information here
              </SheetDescription>
            </SheetHeader>
          </div>

          <form
            onSubmit={handleProfileUpdate}
            className="flex flex-col h-[calc(100%-120px)]"
          >
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-secondary mb-2.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-secondary mb-2.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-secondary mb-2.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-secondary mb-2.5">
                    Position/Title
                  </label>
                  <input
                    type="text"
                    value={profileForm.position}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        position: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-5 border-t border-border">
              <div className="flex flex-col-reverse sm:flex-row gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setEditProfileOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={updateProfileMutation.isPending}
                  className="flex-1"
                >
                  {updateProfileMutation.isPending
                    ? "Updating..."
                    : "Save Changes"}
                </Button>
              </div>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Change Password Sheet */}
      <Sheet open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-xl overflow-y-auto p-0"
        >
          <div className="px-6 pt-6 pb-4 border-b border-border">
            <SheetHeader>
              <SheetTitle className="text-2xl">Change Password</SheetTitle>
              <SheetDescription className="text-base mt-2">
                Update your password to keep your account secure
              </SheetDescription>
            </SheetHeader>
          </div>

          <form
            onSubmit={handlePasswordChange}
            className="flex flex-col h-[calc(100%-120px)]"
          >
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-secondary mb-2.5">
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
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-secondary mb-2.5">
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
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                    required
                    minLength={6}
                  />
                  <p className="text-xs text-muted mt-2.5">
                    Must be at least 6 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-secondary mb-2.5">
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
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-5 border-t border-border">
              <div className="flex flex-col-reverse sm:flex-row gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setChangePasswordOpen(false);
                    setPasswordForm({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={changePasswordMutation.isPending}
                  className="flex-1"
                >
                  {changePasswordMutation.isPending
                    ? "Changing..."
                    : "Change Password"}
                </Button>
              </div>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
