type ValidationCode =
  | 'V001'
  | 'V002'
  | 'V003'
  | 'V004'
  | 'V005'
  | 'V006'
  | 'V007';
type UnauthorizedCode = 'U001';
type NotFoundCode = 'N001' | 'N002' | 'N003' | 'N004';
type ConflictCode = 'C001' | 'C002' | 'C003' | 'C004';
type InternalServerCode = 'I001';
type BadGatewayCode = 'B001';

type ErrorCode =
  | ValidationCode
  | UnauthorizedCode
  | NotFoundCode
  | ConflictCode
  | InternalServerCode
  | BadGatewayCode;

export interface RequestSuccess<T = unknown> {
  code: '';
  message: '';
  data: T;
}

export interface RequestError {
  code: ErrorCode;
  message: string;
  data: null;
}

export type RequestState<T> = RequestSuccess<T> | RequestError;
