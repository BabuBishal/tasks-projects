import React from 'react'
import { User, Mail, Phone, Briefcase, Calendar } from 'lucide-react'
import { UserWithProfile } from '@/lib/types'

interface ProfileInfoCardProps {
  profile: UserWithProfile
}

const ProfileInfoCard = React.memo(({ profile }: ProfileInfoCardProps) => {
  return (
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
  )
})

ProfileInfoCard.displayName = 'ProfileInfoCard'

export default ProfileInfoCard
