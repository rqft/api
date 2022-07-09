import { Input, Output } from "kevin-http";
import { KV } from "../globals";
import { give, stop } from "../models/result";
export async function todoPut(req: Input, res: Output): Promise<void> {
  const userId = req.params.get("userId");
  if (userId) {
    if (!KV.todo.has(userId)) {
      stop(res, 404, "No todos found for that user");
    } else {
      const id = Number(req.params.get("id"));

      if (Number.isNaN(id)) {
        stop(res, 400, "Invalid id");
      } else {
        const todos = KV.todo.get<Array<string>>(userId)!;
        if (todos) {
          const todo = req.query.get("data");

          if (todo) {
            todos[id - 1] = todo;
            KV.todo.put(userId, todos);
            give(res, true);
          } else {
            stop(res, 400, "No todo provided");
          }
        } else {
          stop(res, 404, `No todo found for user ${userId} with id ${id}`);
        }
      }
    }
  } else {
    stop(res, 400, "No user provided");
  }
}
