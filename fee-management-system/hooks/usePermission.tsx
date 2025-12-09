import { useProfileQuery } from '@/app/[locale]/(root)/profile/_hooks'
import { UserProfile } from '@/lib/types/api'
import { checkPermissions } from '@/permissions/authorization'

export const usePermission = (action: string, resource: string) => {
  const { data: userData } = useProfileQuery()
  const user: UserProfile | null = userData?.profile || null
  if (!user) return false
  return checkPermissions(user, action, resource)
}
