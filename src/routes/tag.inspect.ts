import { Request, Response } from "express";
import { KV } from "../globals";
import { give } from "../models/result";

export function tagInspect(_req: Request, res: Response): void {
  give(res, KV.tags.read());
}
