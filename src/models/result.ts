import { Response } from "express";

export interface Result<T> {
  data: T;
  status: Error;
}
export function give<T>(
  res: Response,
  data: T,
  status: Error = {
    state: ResultState.OK,
    message: undefined,
    code: undefined,
  }
): never {
  res.send({ data, status });
  throw null;
}

export enum ResultState {
  OK = "ok",
  ERROR = "error",
}

export interface ErrorOk {
  message?: undefined;
  code?: undefined;
  state: ResultState.OK;
}
export interface ErrorBad {
  message: string;
  code: number;
  state: ResultState.ERROR;
}

export type Error = ErrorOk | ErrorBad;
export function stop(res: Response, code: number, message: string): never {
  res.status(code);
  give(res, null, { state: ResultState.ERROR, message, code });
}
