import { Input, Output } from "@rqft/http";
import { Image } from "imagescript";
import { stop } from "../models/result";
import { createImageEditor, fillColorCode } from "../tools";

export async function imageTint(
  req: Input<"/image/tint/{color}">,
  res: Output
): Promise<void> {
  return createImageEditor(req, res, async (editor) => {
    const opacity = Number(req.query.get("opacity")) || 0.5;

    if (opacity < 0 || opacity > 1) {
      stop(res, 400, "Invalid opacity");
    }

    const frames: Array<Image> = [];

    for (const image of editor) {
      const color = fillColorCode(req.params.get("color"), opacity, res);

      const copy = new Image(image.width, image.height);
      copy.fill(color);
      image.composite(copy);

      frames.push(image);
    }

    return frames;
  });
}
