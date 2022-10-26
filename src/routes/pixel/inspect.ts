import type { Input, Output } from '@rqft/http';
import { KV } from '../../globals';
import { stop } from '../../models/result';
import { generateCanvas } from '../../tools';

export async function pixelInspect(
  _: Input<'/pixel/inspect'>,
  res: Output
): Promise<void> {
  const actions = KV.pixel.get('actions');

  if (!actions) {
    return stop(res, 400, 'No actions found');
  }

  const image = generateCanvas(actions);

  const u8 = await image.encode();

  res.setHeader('content-type', 'image/png');
  res.send(u8);
  return;
}
