import type { Input, Output } from '@rqft/http';
import type { Image } from 'imagescript';
import { createDualEditor, zip } from '../../../tools';

export async function imageDualComposite(req: Input<'/image/dual/composite'>, res: Output) {
  return createDualEditor(req, res, async (source, target) => {
    const frames: Array<Image> = [];

    for (const [a, b] of zip(source, target)) {
      a.composite(b, 0, 0);

      frames.push(a);
    }

    return frames;
  });
}



