import { Request, Response } from "express";
import { give } from "../models/result";
export function origin(req: Request, res: Response): void {
  give(
    res,
    req.headers.origin ||
      req.headers.referer ||
      req.headers.host ||
      req.socket.remoteAddress ||
      req.headers.hostname ||
      null
  );
}
