import { Client } from "kevin-http";
import { Wilson } from "wilson-kv";
export const Sarah = new Client({});

export namespace KV {
  export const prefixes = new Wilson("kv/prefixes");
  export const tags = new Wilson("kv/tags");
  export const colors = new Wilson("kv/colors");
  export const mutes = new Wilson("kv/mutes");
  export const todo = new Wilson("kv/todo");
}
