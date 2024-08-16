export interface IAPIResponse<T> {
  success: boolean;
  data: T;
  message: string;
  status: number;
}
