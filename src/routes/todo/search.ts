import type { Input, Output } from '@rqft/http';
import { KV } from '../../globals';
import { give, stop } from '../../models/result';

export function todoSearch(
  req: Input<'/todos/search/{userId}/{query}'>,
  res: Output
): void {
  const userId = req.params.get('userId');

  if (userId) {
    const query = req.params.get('query');

    let choices = (KV.todo.get(userId) || []).map((x, i) => ({
      data: x,
      index: i + 1,
    }));
    if (query) {
      const results = choices.filter(
        (choice) =>
          choice.data.toLowerCase().includes(query.toLowerCase()) ||
          choice.index.toString().includes(query)
      );
      choices = results;
    }

    give(
      res,
      choices
        .map((choice) => {
          return {
            name: `#${choice.index} - ${choice.data.slice(0, 10)}${
              choice.data.length > 10 ? '...' : ''
            }`,
            value: choice.index,
          };
        })
        .slice(0, 25)
    );
  } else {
    stop(res, 400, 'No user provided');
  }
}
