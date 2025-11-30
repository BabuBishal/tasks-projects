'use client'

import { useState } from 'react'
import { User, Mail, Phone, Briefcase, Calendar, Camera, Upload, Edit, Key } from 'lucide-react'
import { Button } from '@/components/ui/button/Button'
import { useToast } from '@/components/ui/toast'
import { Breadcrumb } from '@/components/ui/breadcrumb/Breadcrumb'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet/sheet'
import { ProfileUpdateInput, PasswordChangeInput } from '@/lib/types'
import Image from 'next/image'
import { useProfileQuery } from '@/hooks/query-hooks/profile'
import {
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useUploadProfilePhotoMutation,
} from '@/hooks/query-hooks/profile/mutation'
import { ProfileSkeleton } from './_components/skeletons/ProfileSkeleton'

export default function ProfilePage() {
  const { notify } = useToast()

  // React Query hooks
  const { data: profile, isLoading } = useProfileQuery()
  const updateProfileMutation = useUpdateProfileMutation()
  const changePasswordMutation = useChangePasswordMutation()
  const uploadPhotoMutation = useUploadProfilePhotoMutation()

  const [editProfileOpen, setEditProfileOpen] = useState(false)
  const [changePasswordOpen, setChangePasswordOpen] = useState(false)

  // Profile form state
  const [profileForm, setProfileForm] = useState<ProfileUpdateInput>({
    name: profile?.name ?? '',
    email: profile?.email ?? '',
    phone: profile?.profile?.phone ?? '',
    position: profile?.profile?.position ?? '',
  })

  const [passwordForm, setPasswordForm] = useState<PasswordChangeInput>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateProfileMutation.mutateAsync(profileForm)
      notify({
        title: 'Success',
        description: 'Profile updated successfully',
        type: 'success',
      })
      setEditProfileOpen(false)
    } catch (error) {
      notify({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update profile',
        type: 'error',
      })
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      notify({
        title: 'Error',
        description: 'Passwords do not match',
        type: 'error',
      })
      return
    }

    try {
      await changePasswordMutation.mutateAsync(passwordForm)
      notify({
        title: 'Success',
        description: 'Password changed successfully',
        type: 'success',
      })
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      setChangePasswordOpen(false)
    } catch (error) {
      notify({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to change password',
        type: 'error',
      })
    }
  }

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        notify({
          title: 'Error',
          description: 'Please select an image file',
          type: 'error',
        })
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        notify({
          title: 'Error',
          description: 'Image size should be less than 5MB',
          type: 'error',
        })
        return
      }

      setSelectedPhoto(file)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePhotoUpload = async () => {
    if (!selectedPhoto) return

    try {
      await uploadPhotoMutation.mutateAsync(selectedPhoto)
      notify({
        title: 'Success',
        description: 'Profile photo updated successfully',
        type: 'success',
      })
      setSelectedPhoto(null)
      setPhotoPreview(null)
    } catch (error) {
      notify({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to upload photo',
        type: 'error',
      })
    }
  }

  if (isLoading) {
    return <ProfileSkeleton />
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-error">Failed to load profile</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full flex-col gap-8 pb-8">
      <Breadcrumb items={[{ label: 'Profile', href: '/profile' }]} />

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-primary text-3xl font-bold">My Profile</h1>
        <p className="text-muted text-base">Manage your account settings and preferences</p>
      </div>

      {/* Profile Summary Card */}
      <div className="bg-card border-border rounded-xl border p-8 shadow-sm">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          {/* Profile Photo with Upload */}
          <div className="group relative">
            <div className="border-border hover:border-primary flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 bg-transparent transition-colors">
              {photoPreview || profile?.profile?.profilePicture ? (
                <Image
                  src={photoPreview || profile?.profile?.profilePicture || ''}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                  width={112}
                  height={112}
                />
              ) : (
                <User className="text-primary h-14 w-14" />
              )}
            </div>
            <label
              htmlFor="photo-upload"
              className="bg-primary hover:bg-primary/90 absolute right-1 bottom-1 cursor-pointer rounded-full p-2.5 shadow-lg transition-colors"
            >
              <Camera className="text-background h-4 w-4" />
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoSelect}
                className="hidden"
              />
            </label>
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-primary mb-1 text-2xl font-semibold">{profile?.name}</h2>
            <p className="text-muted mb-2 flex items-center gap-2 text-base">
              <Mail className="h-4 w-4" /> {profile?.email}
            </p>
            <p className="text-muted text-sm">
              {profile?.profile?.role || 'Staff'} • Member since{' '}
              {new Date(profile?.createdAt || '').toLocaleDateString()}
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
                  <Upload className="h-3 w-3" />
                  {uploadPhotoMutation.isPending ? 'Uploading...' : 'Upload Photo'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedPhoto(null)
                    setPhotoPreview(null)
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>

          {!selectedPhoto && (
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                variant="primary"
                onClick={() => setEditProfileOpen(true)}
                className="flex items-center justify-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
              <Button
                variant="outline"
                onClick={() => setChangePasswordOpen(true)}
                className="flex items-center justify-center gap-2"
              >
                <Key className="h-4 w-4" />
                Change Password
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Read-only Profile Information */}
      <div className="bg-card border-border rounded-xl border p-8 shadow-sm">
        <h3 className="text-primary mb-8 text-xl font-semibold">Profile Information</h3>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-950">
              <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-muted mb-1 text-sm font-medium">Full Name</p>
              <p className="text-primary text-base font-semibold">{profile?.name || 'Not set'}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-green-100 p-3 dark:bg-green-950">
              <Mail className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-muted mb-1 text-sm font-medium">Email Address</p>
              <p className="text-primary truncate text-base font-semibold">
                {profile?.email || 'Not set'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-purple-100 p-3 dark:bg-purple-950">
              <Phone className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-muted mb-1 text-sm font-medium">Phone Number</p>
              <p className="text-primary text-base font-semibold">
                {profile?.profile?.phone || 'Not set'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-orange-100 p-3 dark:bg-orange-950">
              <Briefcase className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-muted mb-1 text-sm font-medium">Position/Title</p>
              <p className="text-primary text-base font-semibold">
                {profile?.profile?.position || 'Not set'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-red-100 p-3 dark:bg-red-950">
              <Briefcase className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-muted mb-1 text-sm font-medium">Role</p>
              <p className="text-primary text-base font-semibold">
                {profile?.profile?.role || 'Staff'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-yellow-100 p-3 dark:bg-yellow-950">
              <Calendar className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-muted mb-1 text-sm font-medium">Member Since</p>
              <p className="text-primary text-base font-semibold">
                {new Date(profile?.createdAt || '').toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Sheet */}
      <Sheet open={editProfileOpen} onOpenChange={setEditProfileOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto p-0 sm:max-w-xl">
          <div className="border-border border-b px-6 pt-6 pb-4">
            <SheetHeader>
              <SheetTitle className="text-2xl">Edit Profile</SheetTitle>
              <SheetDescription className="mt-2 text-base">
                Update your profile information here
              </SheetDescription>
            </SheetHeader>
          </div>

          <form onSubmit={handleProfileUpdate} className="flex h-[calc(100%-120px)] flex-col">
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-6">
                <div>
                  <label className="text-secondary mb-2.5 block text-sm font-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="border-border bg-background text-primary focus:ring-primary w-full rounded-lg border px-4 py-3 transition-shadow focus:ring-2 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-secondary mb-2.5 block text-sm font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="border-border bg-background text-primary focus:ring-primary w-full rounded-lg border px-4 py-3 transition-shadow focus:ring-2 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-secondary mb-2.5 block text-sm font-semibold">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="border-border bg-background text-primary focus:ring-primary w-full rounded-lg border px-4 py-3 transition-shadow focus:ring-2 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-secondary mb-2.5 block text-sm font-semibold">
                    Position/Title
                  </label>
                  <input
                    type="text"
                    value={profileForm.position}
                    onChange={e =>
                      setProfileForm({
                        ...profileForm,
                        position: e.target.value,
                      })
                    }
                    className="border-border bg-background text-primary focus:ring-primary w-full rounded-lg border px-4 py-3 transition-shadow focus:ring-2 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="border-border border-t px-6 py-5">
              <div className="flex flex-col-reverse gap-3 sm:flex-row">
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
                  {updateProfileMutation.isPending ? 'Updating...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Change Password Sheet */}
      <Sheet open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto p-0 sm:max-w-xl">
          <div className="border-border border-b px-6 pt-6 pb-4">
            <SheetHeader>
              <SheetTitle className="text-2xl">Change Password</SheetTitle>
              <SheetDescription className="mt-2 text-base">
                Update your password to keep your account secure
              </SheetDescription>
            </SheetHeader>
          </div>

          <form onSubmit={handlePasswordChange} className="flex h-[calc(100%-120px)] flex-col">
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-6">
                <div>
                  <label className="text-secondary mb-2.5 block text-sm font-semibold">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={e =>
                      setPasswordForm({
                        ...passwordForm,
                        currentPassword: e.target.value,
                      })
                    }
                    className="border-border bg-background text-primary focus:ring-primary w-full rounded-lg border px-4 py-3 transition-shadow focus:ring-2 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-secondary mb-2.5 block text-sm font-semibold">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={e =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value,
                      })
                    }
                    className="border-border bg-background text-primary focus:ring-primary w-full rounded-lg border px-4 py-3 transition-shadow focus:ring-2 focus:outline-none"
                    required
                    minLength={6}
                  />
                  <p className="text-muted mt-2.5 text-xs">Must be at least 6 characters</p>
                </div>

                <div>
                  <label className="text-secondary mb-2.5 block text-sm font-semibold">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={e =>
                      setPasswordForm({
                        ...passwordForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="border-border bg-background text-primary focus:ring-primary w-full rounded-lg border px-4 py-3 transition-shadow focus:ring-2 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="border-border border-t px-6 py-5">
              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setChangePasswordOpen(false)
                    setPasswordForm({
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: '',
                    })
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
                  {changePasswordMutation.isPending ? 'Changing...' : 'Change Password'}
                </Button>
              </div>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  )
}
