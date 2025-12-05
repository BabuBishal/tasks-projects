import { RJSFSchema } from '@rjsf/utils'

const programSchema: RJSFSchema = {
  type: 'object',
  required: ['name', 'duration'],
  properties: {
    name: { type: 'string', title: 'Program Name' },
    duration: { type: 'string', title: 'Total Semesters' },
  },
}

export default programSchema
