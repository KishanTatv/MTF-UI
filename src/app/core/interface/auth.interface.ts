export interface ILoginModel {
  email: string;
  password: string;
}

export interface ITokenDTO {
  token: string;
  refreshToken: string;
  companyId: number;
}
