import type { Input, Output } from '@rqft/http';
import { stop } from '../../models/result';

import { createFFmpegEditor } from '../../tools';

export async function audioPitch(
  req: Input<'/audio/pitch/{amount}'>,
  res: Output
): Promise<void> {
  const pitch = req.params.get('amount');

  const amount = Number(pitch) || 0;

  if (Number.isNaN(amount)) {
    stop(res, 400, 'Invalid pitch');
  }

  return await createFFmpegEditor(req, res, {
    args: [
      ['-f', 'mp3'],
      ['-filter:a', `atempo=${1/amount},asetrate=44100*${amount}`],
    ],
    mimetype: 'audio/mp3',
    destination: 'pitch.mp3',
    source: 'pitch',
  });
}

