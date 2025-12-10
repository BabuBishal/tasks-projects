import { useSession } from 'next-auth/react'
import { checkPermissions } from '@/lib/utils/checkPermissions'

export const usePermission = (action: string, resource: string) => {
  const { data: session, status } = useSession()
  if (status === 'loading') return undefined
  const user = session?.user
  if (!user) return false

  return checkPermissions(user, action, resource)
}
