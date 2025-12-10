import { useQueryClient } from '@tanstack/react-query'
import { LogOut, Settings, User, Mail, Shield } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface ProfileProps {
  user?: {
    name?: string | null
    email?: string | null
  }
  role: string
  profilePicture?: string | null
}

const Profile = ({ user, role, profilePicture }: ProfileProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const handleLogout = async () => {
    await signOut({
      redirect: false,
    })
    queryClient.invalidateQueries({ queryKey: ['/api/profile'] })
    router.push(`/login`)
  }

  return (
    <div className="bg-card border-border absolute top-12 right-0 flex w-72 flex-col rounded-lg border py-3 shadow-lg">
      <div className="border-border border-b px-4 pb-3">
        <div className="mb-2 flex items-center gap-3">
          <div className="bg-primary/10 border-border flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2">
            {profilePicture ? (
              <Image
                src={profilePicture}
                alt="Profile"
                className="h-full w-full object-cover"
                width={48}
                height={48}
              />
            ) : (
              <User className="text-primary h-6 w-6" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h5 className="text-primary truncate text-sm font-semibold">
              {user ? user.name : 'User'}
            </h5>
            <p className="text-muted flex items-center gap-1 truncate text-xs">
              <Mail className="h-3 w-3" />
              {user ? user.email : ''}
            </p>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1">
          <Shield className="h-3 w-3 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400">{role}</span>
        </div>
      </div>

      <div className="py-2">
        <Link
          href="/profile"
          className="hover:bg-accent flex items-center gap-3 px-4 py-2.5 transition-colors"
        >
          <User className="text-secondary h-4 w-4" />
          <span className="text-secondary text-sm font-medium">My Profile</span>
        </Link>
        <Link
          href="/settings"
          className="hover:bg-accent flex items-center gap-3 px-4 py-2.5 transition-colors"
        >
          <Settings className="text-secondary h-4 w-4" />
          <span className="text-secondary text-sm font-medium">Settings</span>
        </Link>
      </div>

      <div className="border-border border-t pt-2">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-red-50 dark:hover:bg-red-950/20"
        >
          <LogOut className="h-4 w-4 text-red-600 dark:text-red-400" />
          <span className="text-sm font-medium text-red-600 dark:text-red-400">Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Profile
