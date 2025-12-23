export interface ILoginModel {
  email: string;
  password: string;
}

export interface ITokenDTO {
  token: string;
  refreshToken: string;
}

export interface IJwtClaims {
  role: string;
  tenant_id: string;
  tenant: string;
  user_id: string;
  username: string;
}
