// ffmpeg -i - output.mp3
import type { Input, Output } from '@rqft/http';
import { createFFmpegEditor } from '../../tools';

export async function audioExtract(req: Input<'/audio/extract'>, res: Output): Promise<void> {
  return await createFFmpegEditor(req, res, {
    args: [
    ],
    mimetype: 'audio/mp3',
    destination: 'extract.mp3',
    source: 'extract'
  });
}
