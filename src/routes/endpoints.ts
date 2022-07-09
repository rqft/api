import { Constants, Input, Output } from "kevin-http";
import { give } from "../models/result";
export async function endpoints(_req: Input, res: Output): Promise<void> {
  res.setHeader("content-type", "text/plain");
  const endpoints: Array<string> = [];
  for (const k in _req.client.endpoints) {
    const key: Constants.HTTPVerbs = k as Constants.HTTPVerbs;
    const collection = _req.client.endpoints[key];

    for (const [, value] of collection) {
      endpoints.push(value.path);
    }
  }
  give(res, endpoints);
}
