import { Image } from "imagescript";
import { Input, Output } from "kevin-http";
import { stop } from "../models/result";
import { createImageEditor } from "../tools";
export async function imageBrightness(req: Input, res: Output): Promise<void> {
  return createImageEditor(req, res, async (editor) => {
    const amount = Number.parseInt(req.params.get("amount") || "0");
    const scaled = req.query.get("amount") === "true";

    if (Number.isNaN(amount)) {
      stop(res, 400, "No amount provided");
    }

    const frames: Array<Image> = [];

    for (const frame of editor) {
      const image = frame.clone();
      image.lightness(amount, scaled);
      frames.push(image);
    }

    return frames;
  });
}
