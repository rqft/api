// editor.fisheye
import { Image } from "imagescript";
import { Input, Output } from "kevin-http";
import { stop } from "../models/result";
import { createImageEditor } from "../tools";
export async function imageFisheye(req: Input, res: Output): Promise<void> {
  return createImageEditor(req, res, async (editor) => {
    const amount = Number.parseInt(req.params.get("amount") || "2");

    if (Number.isNaN(amount)) {
      stop(res, 400, "No amount provided");
    }

    const frames: Array<Image> = [];

    for (const image of editor) {
      const frame = image.clone();
      frame.fisheye(amount);
      frames.push(frame);
    }

    return frames;
  });
}
