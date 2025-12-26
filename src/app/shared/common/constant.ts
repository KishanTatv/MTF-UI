export const CaptchaCharacters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const specificDateFormats = {
  DD_MM_YYYY: 'DD-MM-YYYY',
  dd_MMM_YYYY: 'dd-MMM-yyyy',
  YYYY_MM_dd: 'YYYY-MM-dd',
  MMMdd_yyyy: 'MMM dd, yyyy',
  MMM_YYYY: 'MMM YYYY',
  MMMM_YYYY: 'MMMM YYYY',
};

export const AuthInfoKeys = {
  access_token: 'access_token',
  refresh_token: 'refresh_token',
  company: 'company',
};

export const ValidationMessages = {
  requiredWithCustomMsg: (field: string) => `${field}`,
  required: (field: string) => `${field} is required.`,
  maxLength: (field: string, length: number) =>
    `${field} cannot exceed ${length} characters.`,
  minLength: (field: string, length: number) =>
    `${field} must be at least ${length} characters.`,
  email: (field: string) => `Please enter a valid ${field}.`,
  pattern: (field: string) => `Please enter valid ${field}.`,
  min: (field: string, min: number) =>
    `${field} must be greater than or equal to ${min}.`,
  max: (field: string, max: number) =>
    `${field} must be less than or equal to ${max}.`,
  charactersOnly: () => `Must contain characters only.`,
  alphanumeric: () => `Must contain only letters and numbers.`,
  positive: () => `Must be a positive number.`,
  positiveWithZero: () => `Must be a positive number or zero.`,
  alreadyExists: (field: string) => `${field} already exists.`,
  zipCode: () => `Please enter a six-digit zip code.`,
  password: () =>
    'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.',
};

export const validation = {
  common: {
    emailREGEX: new RegExp(/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/),
    passwordREGEX: new RegExp(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*\W).{8,}$/
    ),
    nameREGEX: new RegExp(/^[a-zA-Z\s]+$/),
    nameWithNumberRegex: new RegExp(/^[a-zA-Z0-9\s]+$/),
    contactREGEX: new RegExp(/^\d{10}$/),
    licensePlateREGEX: new RegExp(/^[A-Z0-9-]{6,15}$/),
    vinREGEX: new RegExp(/^[A-HJ-NPR-Z0-9]{17}$/),
    insuranceNoREGEX: new RegExp(/^[A-Z0-9/-]+$/),
  },
};
