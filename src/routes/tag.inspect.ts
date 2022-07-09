import { Input, Output } from "kevin-http";
import { KV } from "../globals";
import { give } from "../models/result";

export function tagInspect(_req: Input, res: Output): void {
  give(res, KV.tags.read());
}
