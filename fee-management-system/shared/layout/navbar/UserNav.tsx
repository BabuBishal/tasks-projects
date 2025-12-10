'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useProfileQuery } from '@/app/[locale]/(root)/profile/_hooks'
import Image from 'next/image'
import { User } from 'lucide-react'
import Profile from '../profile/Profile'

const UserNav = () => {
  const { data: session } = useSession()
  const { data: profileData } = useProfileQuery()
  const [openDropdown, setOpenDropdown] = useState(false)
  const dropdownRef = useRef<HTMLSpanElement>(null)

  const userRole = session?.user?.role ?? '-'
  const profilePicture = profileData?.profile?.profilePicture

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <span
      ref={dropdownRef}
      className="relative flex cursor-pointer gap-3"
      onClick={() => setOpenDropdown(!openDropdown)}
    >
      <div className="border-border hover:border-primary flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 transition-colors">
        {profilePicture ? (
          <Image
            src={profilePicture}
            alt="Profile"
            width={32}
            height={32}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <User className="text-primary h-5 w-5" />
        )}
      </div>
      {openDropdown && (
        <Profile user={session?.user} role={userRole} profilePicture={profilePicture} />
      )}
    </span>
  )
}

export default UserNav
