import { Input, Output } from "@rqft/http";
import { KV } from "../globals";
import { give, stop } from "../models/result";

export function tagDelete(req: Input<"/tags/delete/{key}">, res: Output): void {
  const key = req.params.get("key");
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
