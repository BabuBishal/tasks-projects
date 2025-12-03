export const feeUiSchema = {
  'ui:field': 'LayoutGridField',
  'ui:layoutGrid': {
    'ui:row': {
      className: 'rows',
      children: [
        {
          'ui:row': {
            className: 'row',
            children: [
              {
                'ui:col': {
                  className: 'col',
                  children: [
                    {
                      name: 'fee.program',
                      type: 'text',
                    },
                  ],
                },
              },
              {
                'ui:col': {
                  className: 'col',
                  children: [
                    {
                      name: 'fee.semester',
                      'ui:widget': 'select',
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          'ui:row': {
            className: 'row',
            children: [
              {
                'ui:col': {
                  className: 'col',
                  children: [
                    {
                      name: 'fee.tuitionFee',
                      'ui:options': {
                        inputType: 'number',
                      },
                    },
                  ],
                },
              },
              {
                'ui:col': {
                  className: 'col',
                  children: [
                    {
                      name: 'fee.labFee',
                      'ui:options': {
                        inputType: 'number',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          'ui:row': {
            className: 'row',
            children: [
              {
                'ui:col': {
                  className: 'col',
                  children: [
                    {
                      name: 'fee.libraryFee',
                      'ui:options': {
                        inputType: 'number',
                      },
                    },
                  ],
                },
              },
              {
                'ui:col': {
                  className: 'col',
                  children: [
                    {
                      name: 'fee.sportsFee',
                      'ui:options': {
                        inputType: 'number',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          'ui:row': {
            className: 'row',
            children: [
              {
                'ui:col': {
                  className: 'col',
                  children: [
                    {
                      name: 'fee.miscFee',
                      'ui:className': 'col-last',
                      'ui:options': {
                        inputType: 'number',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
  fee: {
    program: {
      'ui:disabled': true,
    },
  },
}
