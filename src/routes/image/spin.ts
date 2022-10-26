import { Constants } from '@rqft/fetch';
import type { Input, Output } from '@rqft/http';
import { Frame, GIF } from 'imagescript';
import { stop } from '../../models/result';
import { decodeImage, fetch } from '../../tools';

export async function imageSpin(
  req: Input<'/image/spin'>,
  res: Output
): Promise<void> {
  const url = req.query.get('url') as string;
  if (url) {
    const payload = await fetch(
      url,
      Constants.HTTPVerbs.GET,
      'buffer'
    );

    const editor = await decodeImage(payload.unwrap(), true);

    editor.cropCircle();

    const composite: Array<Frame> = [];
    for (let i = 0; i < 360; i += 15) {
      const frame = editor.clone();
      frame.rotate(i, false);
      composite.push(
        Frame.from(
          frame,
          undefined,
          undefined,
          undefined,
          Frame.DISPOSAL_BACKGROUND
        )
      );
    }

    const gif = new GIF(composite);
    const u8: Uint8Array = await gif.encode();

    const sent = Buffer.from(u8);
    res.setHeader('content-type', 'image/gif');
    res.send(sent);
  } else {
    stop(res, 400, 'No image URL provided');
  }
}
