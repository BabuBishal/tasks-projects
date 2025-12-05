import { RJSFSchema } from '@rjsf/utils'

const changePasswordSchema: RJSFSchema = {
  type: 'object',
  required: ['currentPassword', 'newPassword', 'confirmPassword'],
  properties: {
    currentPassword: { type: 'string', title: 'Current Password', minLength: 4 },
    newPassword: { type: 'string', title: 'New Password', minLength: 4 },
    confirmPassword: { type: 'string', title: 'Confirm New Password', minLength: 4 },
  },
}

export default changePasswordSchema
