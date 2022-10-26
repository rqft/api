import { Client } from '@rqft/http';
import { Wilson } from '@rqft/kv';
import { all, create } from 'mathjs';
import type { Action } from './types';
export const Sarah = new Client({ port: 3000 });

export namespace KV {
  export const prefixes = new Wilson('kv/prefixes');
  export const tags = new Wilson('kv/tags');
  export const colors = new Wilson('kv/colors');
  export const mutes = new Wilson('kv/mutes');
  export const todo = new Wilson<Record<string, Array<string>>>('kv/todo');
  export const pixel = new Wilson<Pixel>('kv/pixel');
  export const kv = new Wilson<Record<string, unknown>>('kv/kv');

  export interface Pixel {
    actions: Array<Action>;
  }
}

export const CanvasSize = 4;
export const mathjs = create(all, { matrix: 'Array', predictable: false });
