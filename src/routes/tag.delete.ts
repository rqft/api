import { Request, Response } from "express";
import { KV } from "../globals";
import { stop } from "../models/error";
import { give } from "../models/result";

export function tagDelete(req: Request, res: Response): void {
  const key = req.params.key;
  if (key) {
    const value = KV.tags.get(key);
    if (value) {
      KV.tags.delete(key);
      give(res, true);
    } else {
      stop(res, 404, "Key not found");
    }
  } else {
    stop(res, 400, "Missing required path parameter 'key'");
  }
}
