import { Input, Output } from "@rqft/http";
import { KV } from "../../globals";
import { give } from "../../models/result";

export function tagList(_req: Input<"/tags/list">, res: Output): void {
  give(res, KV.tags.list());
}
