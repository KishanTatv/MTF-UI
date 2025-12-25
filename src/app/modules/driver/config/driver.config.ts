import { ValidationMessages } from '../../../shared/common/constant';

export const userControl = {
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
    requiredErrMsg: ValidationMessages.required('Last Name'),
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
  contactNo: {
    value: '',
    key: 'phone',
    label: 'Contact No.',
    requiredErrMsg: ValidationMessages.required('Contact No.'),
    patternErrMsg: ValidationMessages.pattern('Contact No.'),
    inputType: 'number',
  },
  licenseNumber: {
    value: '',
    key: 'licenseNumber',
    label: 'License Number',
    inputType: 'text',
    requiredErrMsg: ValidationMessages.required('License number'),
  },
  licenseExpiry: {
    value: '',
    key: 'licenseExpiry',
    label: 'License Expiry',
    inputType: 'date',
    requiredErrMsg: ValidationMessages.required('License Expiry'),
  },
};
