import { Input, Output } from "kevin-http";
import { KV } from "../globals";
import { give, stop } from "../models/result";

export function tagGet(req: Input, res: Output): void {
  const key = req.params.get("key");
  if (key) {
    const value = KV.tags.get(key);
    if (value) {
      give(res, value);
    } else {
      stop(res, 404, "Key not found");
    }
  } else {
    stop(res, 400, "Missing required path parameter 'key'");
  }
}
