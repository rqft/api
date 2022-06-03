import express from "express";
import { KV } from "../globals";
import { stop } from "../models/error";
import { give } from "../models/result";
export async function todoList(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const userId = req.params.userId;
  if (userId) {
    if (!KV.todo.has(userId)) {
      stop(res, 404, "No todos found for that user");
    } else {
      const todos = KV.todo.get<Array<string>>(userId)!;
      give(res, todos);
    }
  } else {
    stop(res, 400, "No user provided");
  }
}
