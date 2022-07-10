import { Input, Output } from "kevin-http";
import { stop } from "../models/result";
import { createImageEditor } from "../tools";
export async function imageTilt(
  req: Input<"/image/tilt/{amount}">,
  res: Output
): Promise<void> {
  return createImageEditor(req, res, async (editor) => {
    const amount = Number(req.params.get("amount")) || 12;

    const [image] = editor;

    if (!image) {
      stop(res, 400, "No image provided");
    }

    for (let i = 0; i < amount; i++) {
      const frame = image.clone();
      frame.rotate(i, false);
      frame.opacity(0.1);
      image.composite(frame);
    }

    return editor;
  });
}
