export interface FormControlModel {
    value?: string | boolean;
    key: string;
    label?: string;
    placeHolder?: string;
    isDisable?: boolean;
    requiredErrMsg?: string;
    passwordMismatchErrMsg?: string;
    patternErrMsg?: string;
    customErrMsg?: string;
    maxLengthError?: string;
    minLengthError?: string;
    minErrMsg?: string;
    maxErrMsg?: string;
    inputType: string;
    displayIcon?: boolean;
    iconName?: string;
    imageUploadInfo?: string;
    previewUrl?: string | ArrayBuffer | null;
    trimLeadingZeroes?: boolean;
    defaultZero?: boolean;
  }
  
  export interface ICheckBoxOptionModel {
    value: number;
    label: string;
    checked?: boolean;
  }
  
  export interface ISelectOptionModel {
    id: number | string;
    key: string | boolean;
    value: string | number;
  }
  
  export interface IRadioOptionModel {
    key: string | boolean;
    value: string | number;
    disabled?: boolean;
    icon?: string;
  }