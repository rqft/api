import type { Input, Output } from '@rqft/http';
import { Image } from 'imagescript';
import { createDualEditor, u8, zip } from '../../../tools';
import type { Rgba } from '../../../types';

export function pixelOps<T extends `/${string}`>(
  f: (rgba: Rgba, other: Rgba) => Rgba
) {
  return async (req: Input<T>, res: Output) => {
    return createDualEditor(req, res, async (source, target) => {
      const frames: Array<Image> = [];

      for (const [a, b] of zip(source, target)) {
        for (const [x, y, color] of a.iterateWithColors()) {
          try {
            const r = Image.colorToRGBA(color) as Rgba;
            const t = b.getRGBAAt(x,y) as never as Rgba;

            a.setPixelAt(x, y, Image.rgbaToColor(...f(t,r).map(u8) as Rgba));
          } catch { 
            continue;
          }
        }

        frames.push(a);
      }

      return frames;
    });
  };
}


