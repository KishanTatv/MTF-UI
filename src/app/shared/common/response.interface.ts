export interface IResponseModel<T> {
  result: boolean;
  statusCode: number;
  message: string;
  data: T;
}
