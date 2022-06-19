import { Response } from "express";

export interface Result<T> {
  data: T;
  status: Status;
}
export function give<T>(
  res: Response,
  data: T,
  status: Status = {
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

export interface Ok {
  message?: undefined;
  code?: undefined;
  state: ResultState.OK;
}

export interface Err {
  message: string;
  code: number;
  state: ResultState.ERROR;
}

export type Status = Ok | Err;
export function stop(res: Response, code: number, message: string): never {
  res.status(code);
  give(res, null, { state: ResultState.ERROR, message, code });
}
