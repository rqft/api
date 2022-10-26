import type { Input, Output } from '@rqft/http';
import type { Image } from 'imagescript';
import { createDualEditor, zip } from '../../../tools';

export async function imageDualOverlay(req: Input<'/image/dual/overlay'>, res: Output) {
  return createDualEditor(req, res, async (source, target) => {
    const frames: Array<Image> = [];

    for (const [a, b] of zip(source, target)) {
      a.composite(b.opacity(0.5), 0, 0);

      frames.push(a);
    }

    return frames;
  });
}



