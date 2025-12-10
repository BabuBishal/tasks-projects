export const PERMISSIONS: Record<string, string[]> = {
  ADMIN: ['*'],
  STUDENT: ['view:self', 'view:fees', 'view:payments', 'create:payments'],
  STAFF: [
    'view:students',
    'view:programs',
    'view:fee-structures',
    'view:student-details',
    'update:student-details',
  ],
  ACCOUNTANT: [
    'view:students',
    'view:programs',
    'view:fee-structures',
    'view:student-details',
    'update:student-details',
    'view:payments',
    'update:payments',
    'update:fees',
  ],
}
