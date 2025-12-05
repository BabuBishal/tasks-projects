export const profileUiSchema = {
  name: {
    'ui:placeholder': 'Enter your full name',
    'ui:classNames': 'textInputWrapper',
  },
  email: {
    'ui:placeholder': 'Enter your email address',
    'ui:classNames': 'textInputWrapper',
    'ui:options': {
      inputType: 'email',
    },
  },
  phone: {
    'ui:placeholder': 'Enter your phone number',
    'ui:classNames': 'textInputWrapper',
    'ui:options': {
      inputType: 'tel',
    },
  },
  position: {
    'ui:placeholder': 'Enter your position/title',
    'ui:classNames': 'textInputWrapper',
  },
  // 'ui:submitButtonOptions': {
  //   norender: false,
  //   submitText: 'Submit',
  // },
}

export const changePasswordUiSchema = {
  currentPassword: {
    'ui:placeholder': 'Enter your current password',
    'ui:classNames': 'textInputWrapper',
    'ui:widget': 'password',
    'ui:options': {
      inputType: 'password',
    },
  },
  newPassword: {
    'ui:placeholder': 'Enter your new password',
    'ui:classNames': 'textInputWrapper',
    'ui:widget': 'password',
    // 'ui:options': {
    //   inputType: 'password',
    // },
  },
  confirmPassword: {
    'ui:placeholder': 'Confirm your new password',
    'ui:classNames': 'textInputWrapper',
    'ui:widget': 'password',

    // 'ui:options': {
    //   inputType: 'password',
    // },
  },
}
