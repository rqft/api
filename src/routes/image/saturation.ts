import { Input, Output } from "@rqft/http";
import { Image } from "imagescript";
import { stop } from "../../models/result";
import { createImageEditor } from "../../tools";
export async function imageSaturation(
  req: Input<"/image/saturation/{amount}">,
  res: Output
): Promise<void> {
  return createImageEditor(req, res, async (editor) => {
    const amount = Number(req.params.get("amount") || 1);
    const scaled = req.query.get("scale") === "true";

    if (Number.isNaN(amount)) {
      stop(res, 400, "No amount provided");
    }

    const frames: Array<Image> = [];

    for (const frame of editor) {
      const image = frame.clone();
      image.saturation(amount, scaled);
      frames.push(image);
    }

    return frames;
  });
}
