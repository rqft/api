import { Input, Output } from "@rqft/http";
import { KV } from "../../globals";
import { give, stop } from "../../models/result";
export async function todoDelete(
  req: Input<"/todos/delete/{userId}/{id}">,
  res: Output
): Promise<void> {
  const userId = req.params.get("userId");
  if (userId) {
    if (!KV.todo.has(userId)) {
      stop(res, 404, "No todos found for user");
    } else {
      const todos = KV.todo.get(userId)!;
      const id = Number(req.params.get("id"));

      if (Number.isNaN(id)) {
        stop(res, 400, "Invalid id");
      } else {
        const todo = todos[id - 1];
        if (todo) {
          todos.splice(id - 1, 1);
          KV.todo.put(userId, todos);
          give(res, true);
        } else {
          stop(res, 404, `No todo found for user ${userId} with id ${id}`);
        }
      }
    }
  } else {
    stop(res, 400, "No user provided");
  }
}
