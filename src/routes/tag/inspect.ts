import type { Input, Output } from '@rqft/http';
import { KV } from '../../globals';
import { give } from '../../models/result';

export function tagInspect(_req: Input<'/tags/inspect'>, res: Output): void {
  give(res, KV.tags.read());
}
