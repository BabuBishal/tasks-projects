import { UserProfile } from '@/lib/types/api'

type Role = 'admin' | 'staff'

const PERMISSIONS: Record<Role, string[]> = {
  admin: [
    'view:students',
    'create:students',
    'update:students',
    'delete:students',
    'view:fee',
    'create:fee',
    'update:fee',
    'delete:fee',
    'view:payments',
    'create:payments',
    'update:payments',
    'delete:payments',
    'view:users',
    'create:users',
    'update:users',
    'delete:users',
    'view:programs',
    'create:programs',
    'update:programs',
    'delete:programs',
    'view:settings',
    'update:settings',
  ],
  staff: [
    'view:students',
    'create:students',
    'update:students',
    'view:fee',
    'create:fee',
    'update:fee',
    'view:payments',
    'create:payments',
    'update:payments',
    'view:programs',
    'create:programs',
    'update:programs',
  ],
}

export const checkPermissions = (user: UserProfile, action: string, resources: string) => {
  const role = user?.role as Role
  const allowedPermissions = PERMISSIONS[role]
  if (!allowedPermissions) return false

  return allowedPermissions.includes(`${action}:${resources}`)
}
