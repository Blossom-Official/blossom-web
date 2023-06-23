export type ValidationCode =
  | 'V001'
  | 'V002'
  | 'V003'
  | 'V004'
  | 'V005'
  | 'V006'
  | 'V007';
export type UnauthorizedCode = 'U001';
export type NotFoundCode = 'N001' | 'N002' | 'N003' | 'N004';
export type ConflictCode = 'C001' | 'C002' | 'C003' | 'C004';
export type InternalServerCode = 'I001';
export type BadGatewayCode = 'B001';

export interface BaseResponse<T> {
  code:
    | ValidationCode
    | UnauthorizedCode
    | NotFoundCode
    | ConflictCode
    | InternalServerCode
    | BadGatewayCode;
  message: string;
  data: T;
}
