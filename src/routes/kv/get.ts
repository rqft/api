import type { Input, Output } from '@rqft/http';
import { KV } from '../../globals';
import { give } from '../../models/result';

export function kvRead(input: Input<'/kv/r/{guildId}'>, output: Output) {
  return give(output, KV.kv.get(input.params.get('guildId')));
}

export function kvWrite(input: Input<'/kv/w/{guildId}'>, output: Output) {
  console.log('writing');
  const i = input.params.get('guildId');
  return give(output, KV.kv.put(i, JSON.parse(input.query.get('data'))).get(i));
}
