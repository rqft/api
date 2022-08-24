import { Client } from "@rqft/http";
import { Wilson } from "@rqft/kv";
import { all, create } from "mathjs";
export const Sarah = new Client({ port: 3000 });

export namespace KV {
  export const prefixes = new Wilson("kv/prefixes");
  export const tags = new Wilson("kv/tags");
  export const colors = new Wilson("kv/colors");
  export const mutes = new Wilson("kv/mutes");
  export const todo = new Wilson("kv/todo");
  export const pixel = new Wilson("kv/pixel");
}

export const CanvasSize = 4;
export const mathjs = create(all, { matrix: "Array", predictable: false });
