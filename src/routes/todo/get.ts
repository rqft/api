import type { Input, Output } from '@rqft/http';
import { KV } from '../../globals';
import { give, stop } from '../../models/result';
export async function todoGet(
  req: Input<'/todos/get/{userId}/{id}'>,
  res: Output
): Promise<void> {
  const userId = req.params.get('userId');
  if (userId) {
    if (!KV.todo.has(userId)) {
      stop(res, 404, 'No todos found for that user');
    } else {
      const id = Number(req.params.get('id'));

      if (Number.isNaN(id)) {
        stop(res, 400, 'Invalid id');
      } else {
        const todo = KV.todo.get(userId)![id - 1];
        if (todo) {
          give(res, todo);
        } else {
          stop(res, 404, `No todo found for user ${userId} with id ${id}`);
        }
      }
    }
  } else {
    stop(res, 400, 'No user provided');
  }
}
