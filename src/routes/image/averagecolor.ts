import type { Input, Output } from '@rqft/http';
import { give } from '../../models/result';
import { createImageEditor } from '../../tools';
export async function imageAverageColor(
  req: Input<'/image/average-color'>,
  res: Output
): Promise<void> {
  return createImageEditor(req, res, async (editor) => {
    give(res, editor.at(0)?.averageColor());
  });
}
