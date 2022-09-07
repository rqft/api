import { Input, Output } from "@rqft/http";
import { KV } from "../../globals";
import { give, stop } from "../../models/result";
export async function todoList(
  req: Input<"/todos/list/{userId}">,
  res: Output
): Promise<void> {
  const userId = req.params.get("userId");
  if (userId) {
    if (!KV.todo.has(userId)) {
      stop(res, 404, "No todos found for that user");
    } else {
      const todos = KV.todo.get(userId)!;
      give(res, todos);
    }
  } else {
    stop(res, 400, "No user provided");
  }
}
