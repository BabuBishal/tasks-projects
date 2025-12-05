import { Breadcrumb } from '@/shared/ui/breadcrumb/Breadcrumb'
import ProfileContent from './_components/ProfileContent'
import ProfileHeader from './_components/ProfileHeader'

export default function ProfilePage() {
  return (
    <div className="flex h-full w-full flex-col gap-8 pb-8">
      <Breadcrumb items={[{ label: 'Profile', href: '/profile' }]} />

      <ProfileHeader />
      <ProfileContent />
    </div>
  )
}
