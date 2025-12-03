import { JSONSchema7 } from 'json-schema'

const profileSchema: JSONSchema7 = {
  type: 'object',
  required: ['name', 'email'],
  properties: {
    name: { type: 'string', title: 'Full Name', minLength: 3 },
    email: { type: 'string', title: 'Email Address', format: 'email' },
    phone: { type: 'string', title: 'Phone Number', pattern: '^[0-9]{7,15}$' },
    position: { type: 'string', title: 'Position/Title' },
  },
}

export default profileSchema
