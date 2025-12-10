import { PERMISSIONS } from '@/lib/permissions/permissions'
import type { Session } from 'next-auth'

export const checkPermissions = (user: Session['user'], action: string, resources: string) => {
  const role = user?.role
  const allowedPermissions = PERMISSIONS[role]
  if (!allowedPermissions) return false
  if (allowedPermissions.includes('*')) return true

  return allowedPermissions.includes(`${action}:${resources}`)
}
