import express from "express";
import { KV } from "../globals";
import { give, stop } from "../models/result";
export async function todoPost(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const userId = req.params.userId;
  if (userId) {
    const existing = KV.todo.get<Array<string>>(userId) || [];

    const todo = req.query.data as string | undefined;

    if (todo) {
      existing.push(todo);
      KV.todo.put(userId, existing);
      give(res, true);
    } else {
      stop(res, 400, "No todo provided");
    }
  } else {
    stop(res, 400, "No user provided");
  }
}
