import { ValidationMessages } from '../../shared/common/constant';

export const loginControl = {
  emailField: {
    value: '',
    key: 'email',
    label: 'Email',
    requiredErrMsg: ValidationMessages.required('Email'),
    patternErrMsg: ValidationMessages.pattern('Email'),
    inputType: 'text',
    displayIcon: true,
    iconName: 'person',
  },
  passwordField: {
    value: '',
    key: 'password',
    label: 'Password',
    requiredErrMsg: ValidationMessages.required('Password'),
    patternErrMsg: ValidationMessages.password(),
    inputType: 'password',
    displayIcon: true,
  },
  rememberMe: {
    value: '',
    key: 'rememberMe',
    label: 'Remember Me',
    inputType: 'checkbox',
  },
};

export const signupControl = {
  firstName: {
    value: '',
    key: 'firstName',
    label: 'First Name',
    inputType: 'text',
    requiredErrMsg: ValidationMessages.required('First Name'),
    maxLengthError: ValidationMessages.maxLength('First Name', 20),
    patternErrMsg: ValidationMessages.pattern('First Name'),
  },
  lastName: {
    value: '',
    key: 'lastName',
    label: 'Last Name',
    inputType: 'text',
    minLengthError: ValidationMessages.minLength('Last Name', 5),
    maxLengthError: ValidationMessages.maxLength('last Name', 20),
    patternErrMsg: ValidationMessages.pattern('Last Name'),
  },
  emailAddress: {
    value: '',
    key: 'email',
    label: 'Email Address',
    requiredErrMsg: ValidationMessages.required('Email Address'),
    patternErrMsg: ValidationMessages.pattern('Email Address'),
    inputType: 'text',
  },
  passwordField: {
    value: '',
    key: 'password',
    label: 'Password',
    requiredErrMsg: ValidationMessages.required('Password'),
    patternErrMsg: ValidationMessages.password(),
    inputType: 'password',
  },
  confirmPassField: {
    value: '',
    key: 'confirmPassword',
    label: 'Confirm Password',
    requiredErrMsg: ValidationMessages.required('Confirm Password'),
    customErrMsg: ValidationMessages.requiredWithCustomMsg(
      'password and confirm password do not match.'
    ),
    inputType: 'password',
  },
  contactNo: {
    value: '',
    key: 'phone',
    label: 'Contact No.',
    requiredErrMsg: ValidationMessages.required('Contact No.'),
    patternErrMsg: ValidationMessages.pattern('Contact No.'),
    inputType: 'number',
  },
  captcha: {
    value: '',
    key: 'captcha',
    label: 'Captcha Code',
    requiredErrMsg: ValidationMessages.required('Captcha'),
    inputType: 'text',
  },
  company: {
    value: '',
    key: 'companyName',
    label: 'Company',
    inputType: 'text',
    requiredErrMsg: ValidationMessages.required('Company Name'),
    maxLengthError: ValidationMessages.maxLength('Company Name', 100),
  },
};
