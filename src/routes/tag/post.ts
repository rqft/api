import type { Input, Output } from '@rqft/http';
import { KV } from '../../globals';
import { give, stop } from '../../models/result';

export function tagPost(req: Input<'/tags/post/{key}'>, res: Output): void {
  const key = req.params.get('key');
  const value = req.query.get('value') as string;
  if (key && value) {
    KV.tags.put(key, value);
    give(res, true);
  } else {
    stop(res, 400, 'Missing required path parameter \'key\' or \'value\'');
  }
}
