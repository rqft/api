import express from "express";
import { Wilson } from "wilson-kv";
import { User } from "./models/user";
export const Sarah = express();
export const Authorized: Array<User> = [
  { username: "admin", password: "admin" },
  { username: "insyri", password: "abcd" },
  { username: "sern", password: "sern" },
];
export const NeedsNoAuth: Array<string> = ["/authorized", "/endpoints"];

export namespace KV {
  export const prefixes = new Wilson("kv/prefixes");
  export const tags = new Wilson("kv/tags");
  export const colors = new Wilson("kv/colors");
  export const mutes = new Wilson("kv/mutes");
  export const todo = new Wilson("kv/todo");
}
