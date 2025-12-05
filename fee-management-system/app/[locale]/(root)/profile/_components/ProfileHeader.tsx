import React from 'react'

const ProfileHeader = React.memo(() => {
  return (
    <div className="space-y-1">
      <h1 className="text-primary text-3xl font-bold">My Profile</h1>
      <p className="text-muted text-base">Manage your account settings and preferences</p>
    </div>
  )
})

ProfileHeader.displayName = 'ProfileHeader'

export default ProfileHeader
