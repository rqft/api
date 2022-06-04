import { Request, Response } from "express";
import { give } from "../models/result";
export function origin(req: Request, res: Response): void {
  give(res, req.socket.remoteAddress || null);
}
