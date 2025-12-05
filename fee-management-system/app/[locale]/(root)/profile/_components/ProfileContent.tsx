'use client'

import { useState, useCallback } from 'react'
import { useProfileQuery } from '@/app/[locale]/(root)/profile/_hooks'
import { ProfileSkeleton } from './skeletons/ProfileSkeleton'
import EditProfile from './EditProfile'
import ProfilePhotoSection from './ProfilePhotoSection'
import ProfileInfoCard from './ProfileInfoCard'
import ChangePasswordSheet from './ChangePasswordSheet'

export default function ProfileContent() {
  const { data: profile, isLoading } = useProfileQuery()

  const [editProfileOpen, setEditProfileOpen] = useState(false)
  const [changePasswordOpen, setChangePasswordOpen] = useState(false)

  const handleEditProfile = useCallback(() => {
    setEditProfileOpen(true)
  }, [])

  const handleChangePassword = useCallback(() => {
    setChangePasswordOpen(true)
  }, [])

  const handleCloseEditProfile = useCallback(() => {
    setEditProfileOpen(false)
  }, [])

  const handleClosePasswordSheet = useCallback(() => {
    setChangePasswordOpen(false)
  }, [])

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
      <ProfilePhotoSection
        profile={profile}
        onEditProfile={handleEditProfile}
        onChangePassword={handleChangePassword}
      />

      <ProfileInfoCard profile={profile} />

      <EditProfile
        editProfileOpen={editProfileOpen}
        setEditProfileOpen={handleCloseEditProfile}
        profile={profile}
      />

      <ChangePasswordSheet isOpen={changePasswordOpen} onClose={handleClosePasswordSheet} />
    </div>
  )
}
