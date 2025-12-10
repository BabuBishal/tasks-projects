'use client'

import React, { useState, useCallback } from 'react'
import { User, Mail, Camera, Upload, Edit, Key } from 'lucide-react'
import { Button } from '@/shared/ui/button/Button'
import Image from 'next/image'
import { UserWithProfile } from '@/lib/types'
import { useToast } from '@/shared/ui/toast'
import { useUploadProfilePhotoMutation } from '@/app/[locale]/(root)/profile/_hooks/mutation'

interface ProfilePhotoSectionProps {
  profile: UserWithProfile
  onEditProfile: () => void
  onChangePassword: () => void
  userRole: string
}

const ProfilePhotoSection = React.memo(
  ({ profile, onEditProfile, onChangePassword, userRole }: ProfilePhotoSectionProps) => {
    const { notify } = useToast()
    const uploadPhotoMutation = useUploadProfilePhotoMutation()

    const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null)
    const [photoPreview, setPhotoPreview] = useState<string | null>(null)

    const handlePhotoSelect = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
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
      },
      [notify]
    )

    const handlePhotoUpload = useCallback(async () => {
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
    }, [selectedPhoto, uploadPhotoMutation, notify])

    const handleCancelPhoto = useCallback(() => {
      setSelectedPhoto(null)
      setPhotoPreview(null)
    }, [])

    return (
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
              <span className="text-primary font-semibold">{userRole}</span> • Member since{' '}
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
                <Button variant="outline" size="sm" onClick={handleCancelPhoto}>
                  Cancel
                </Button>
              </div>
            )}
          </div>

          {!selectedPhoto && (
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                variant="primary"
                onClick={onEditProfile}
                className="flex items-center justify-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
              <Button
                variant="outline"
                onClick={onChangePassword}
                className="flex items-center justify-center gap-2"
              >
                <Key className="h-4 w-4" />
                Change Password
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }
)

ProfilePhotoSection.displayName = 'ProfilePhotoSection'

export default ProfilePhotoSection
