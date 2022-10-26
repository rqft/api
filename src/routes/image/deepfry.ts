import type { Input, Output } from '@rqft/http';
import { Image } from 'imagescript';
import { stop } from '../../models/result';
import { createImageEditor } from '../../tools';
export async function imageDeepfry(
  req: Input<'/image/deepfry/{threshold}'>,
  res: Output
): Promise<void> {
  return createImageEditor(req, res, async (editor) => {
    const threshold = Number.parseFloat(req.params.get('threshold') || '1');

    if (threshold > 0xff || threshold < 0 || Number.isNaN(threshold)) {
      stop(res, 400, `Invalid threshold '${req.params.get('threshold')}'`);
    }

    const frames: Array<Image> = [];
 
    for (const frame of editor) {
      for (const [x, y, color] of frame.iterateWithColors()) {
        let [r, g, b] = Image.colorToRGB(color) as [number, number, number];

        
        if (r < threshold) { r = 0x00; } else { r = 0xff; }
        if (g < threshold) { g = 0x00; } else { g = 0xff; }
        if (b < threshold) { b = 0x00; } else { b = 0xff; }

        frame.setPixelAt(x,y,Image.rgbToColor(r,g,b));
      }
      
      frames.push(frame);

    }

    return frames;
  });
}
