import { RJSFSchema } from '@rjsf/utils'

const feeSchema: RJSFSchema = {
  type: 'object',
  properties: {
    fee: {
      type: 'object',
      properties: {
        program: { type: 'string', title: 'Program', readOnly: true },
        semester: {
          type: 'string',
          title: 'Semester',
          anyOf: [
            { const: '1', title: '1st Semester' },
            { const: '2', title: '2nd Semester' },
            { const: '3', title: '3rd Semester' },
            { const: '4', title: '4th Semester' },
            { const: '5', title: '5th Semester' },
            { const: '6', title: '6th Semester' },
            { const: '7', title: '7th Semester' },
            { const: '8', title: '8th Semester' },
          ],
        },
        tuitionFee: { type: 'number', title: 'Tuition Fee' },
        miscFee: { type: 'number', title: 'Miscellaneous Fee' },
        labFee: { type: 'number', title: 'Lab Fee' },
        libraryFee: { type: 'number', title: 'Library Fee' },
        sportsFee: { type: 'number', title: 'Sports Fee' },
      },
      required: [
        'program',
        'semester',
        'tuitionFee',
        'miscFee',
        'labFee',
        'libraryFee',
        'sportsFee',
      ],
    },
  },
}

export default feeSchema
