import { useSession } from 'next-auth/react'
import { checkPermissions } from '@/permissions/authorization'

export const usePermission = (action: string, resource: string) => {
  const { data: session } = useSession()

  const user = session?.user
  if (!user) return false

  return checkPermissions(user, action, resource)
}
