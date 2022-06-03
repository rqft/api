import { Request, Response } from "express";
import { KV } from "../globals";
import { give } from "../models/result";

export function tagList(_req: Request, res: Response): void {
  give(res, KV.tags.list());
}
