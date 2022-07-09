import { Input, Output } from "kevin-http";
import { give } from "../models/result";
import { createImageEditor } from "../tools";
export async function imageAverageColor(
  req: Input,
  res: Output
): Promise<void> {
  return createImageEditor(req, res, async (editor) => {
    give(res, editor[0]!.averageColor());
  });
}
