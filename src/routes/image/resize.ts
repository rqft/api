import type { Input, Output } from '@rqft/http';
import { Image } from 'imagescript';
import { stop } from '../../models/result';
import { createImageEditor } from '../../tools';
export async function imageResize(
  req: Input<'/image/resize/{size}'>,
  res: Output
): Promise<void> {
  return createImageEditor(req, res, async (editor) => {
    const size: string = req.params.get('size') || '1';

    const frames: Array<Image> = [];

    for (const image of editor) {
      switch (true) {
      case /^\d+x\d+$/.test(size): {
        const [width, height] = size.split('x').map(Number);
        image.resize(width || 1, height || 1);
        break;
      }
      case /^x\d+$/.test(size): {
        const [, height] = size.split('x');
        image.resize(Image.RESIZE_AUTO, Number(height));
        break;
      }
      case /^\d+x$/.test(size): {
        const [width] = size.split('x');
        image.resize(Number(width), Image.RESIZE_AUTO);
        break;
      }
      case /^[\d.]+$/.test(size): {
        image.scale(Number(size));
        break;
      }
      default: {
        stop(res, 400, `Invalid size: ${size}`);
      }
      }

      return image;
    }

    return frames;
  });
}
