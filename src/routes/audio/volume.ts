import type { Input, Output } from '@rqft/http';
import { createFFmpegEditor } from '../../tools';

export async function audioVolume(
  req: Input<'/audio/volume/{amount}'>,
  res: Output
): Promise<void> {
  const amount = req.params.get('amount');

  return await createFFmpegEditor(req, res, {
    args: [
      ['-f', 'mp3'],
      ['-filter:a', `volume=${amount}`],
    ],
    mimetype: 'audio/mp3',
    destination: 'volume.mp3',
    source:'volume'
  });
}
