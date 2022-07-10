import { Input, Output } from "kevin-http";
import { give } from "../models/result";
export function origin(req: Input<"/origin">, res: Output): void {
  give(
    res,
    req.headers.get("x-forwarded-for") || req.data.socket.remoteAddress || null
  );
}
