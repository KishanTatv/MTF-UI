import { ValidationMessages } from '../../../shared/common/constant';
import { ISelectOptionModel } from '../../../shared/form-control/interface/form-control.interface';

export const vehicleControl = {
  licensePlate: {
    value: '',
    key: 'licensePlate',
    label: 'License Plate',
    inputType: 'text',
    requiredErrMsg: ValidationMessages.required('License Plate'),
    minLengthError: ValidationMessages.minLength('License Plate', 6),
    maxLengthError: ValidationMessages.maxLength('License Plate', 15),
    patternErrMsg: ValidationMessages.pattern('License Plate'),
  },
  VIN: {
    value: '',
    key: 'vin',
    label: 'VIN',
    inputType: 'text',
    requiredErrMsg: ValidationMessages.required('VIN'),
    minLengthError: ValidationMessages.minLength('VIN', 17),
    maxLengthError: ValidationMessages.maxLength('VIN', 17),
    patternErrMsg: ValidationMessages.pattern('VIN'),
  },
  model: {
    value: '',
    key: 'model',
    label: 'Model',
    inputType: 'text',
    requiredErrMsg: ValidationMessages.required('Model'),
    maxLengthError: ValidationMessages.maxLength('Model', 20),
    patternErrMsg: ValidationMessages.pattern('Model'),
  },
  type: {
    value: '',
    key: 'type',
    label: 'Type',
    inputType: 'text',
    requiredErrMsg: ValidationMessages.required('Type'),
    minLengthError: ValidationMessages.minLength('Type', 5),
    maxLengthError: ValidationMessages.maxLength('Type', 20),
    patternErrMsg: ValidationMessages.pattern('Type'),
  },
  capacity: {
    value: '',
    key: 'capacity',
    label: 'Capacity',
    inputType: 'text',
    requiredErrMsg: ValidationMessages.required('Capacity'),
    maxLengthError: ValidationMessages.maxLength('Capacity', 20),
    patternErrMsg: ValidationMessages.pattern('Capacity'),
  },
  insuranceNumber: {
    value: '',
    key: 'insuranceNumber',
    label: 'InsuranceNumber',
    inputType: 'text',
    requiredErrMsg: ValidationMessages.required('Insurance Number'),
    minLengthError: ValidationMessages.minLength('Insurance Number', 5),
    maxLengthError: ValidationMessages.maxLength('Insurance Number', 30),
    patternErrMsg: ValidationMessages.pattern('Insurance Number'),
  },
  insuranceExpiry: {
    value: '',
    key: 'insuranceExpiry',
    label: 'Insurance Expiry',
    inputType: 'text',
    requiredErrMsg: ValidationMessages.required('Insurance Expiry'),
    maxLengthError: ValidationMessages.maxLength('Insurance Expiry', 20),
    patternErrMsg: ValidationMessages.pattern('Insurance Expiry'),
  },
};

export const vehicleTypeOption: ISelectOptionModel[] = [
  {
    id: 'Light Commercial Vehicle',
    key: '0',
    value: 'Light Commercial Vehicle',
  },
  {
    id: 'Heavy Commercial Vehicle',
    key: '1',
    value: 'Heavy Commercial Vehicle',
  },
  {
    id: 'Medium Commercial Vehicle',
    key: '2',
    value: 'Medium Commercial Vehicle',
  },
  {
    id: 'Passenger Vehicle',
    key: '3',
    value: 'Passenger Vehicle',
  },
  {
    id: 'Two Wheeler',
    key: '4',
    value: 'Two Wheeler',
  },
  {
    id: 'Three Wheeler',
    key: '5',
    value: 'Three Wheeler',
  },
  {
    id: 'Bus',
    key: '6',
    value: 'Bus',
  },
  {
    id: 'Truck',
    key: '7',
    value: 'Truck',
  },
  {
    id: 'Trailer',
    key: '8',
    value: 'Trailer',
  },
  {
    id: 'Construction Vehicle',
    key: '9',
    value: 'Construction Vehicle',
  },
];
