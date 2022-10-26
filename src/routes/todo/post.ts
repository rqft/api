import type { Input, Output } from '@rqft/http';
import { KV } from '../../globals';
import { give, stop } from '../../models/result';
export async function todoPost(
  req: Input<'/todos/post/{userId}'>,
  res: Output
): Promise<void> {
  const userId = req.params.get('userId');
  if (userId) {
    const existing = KV.todo.get(userId) || [];

    const todo = req.query.get('data') as string;

    if (todo) {
      existing.push(todo);
      KV.todo.put(userId, existing);
      give(res, true);
    } else {
      stop(res, 400, 'No todo provided');
    }
  } else {
    stop(res, 400, 'No user provided');
  }
}
