import express from "express";
import { isAuthorized } from "../auth";
import { give, stop } from "../models/result";

export function authorized(req: express.Request, res: express.Response): void {
  const token = req.headers.authorization || (req.query.token as string);
  if (token) {
    if (isAuthorized(token)) {
      give(res, true);
    } else {
      give(res, false);
    }
  } else {
    stop(res, 400, "No token provided");
  }
}
