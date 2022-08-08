import { Input, Output } from "@rqft/http";
import { Image } from "imagescript";
import { stop } from "../models/result";
import { createImageEditor } from "../tools";
export async function imageRotate(
  req: Input<"/image/rotate/{deg}">,
  res: Output
): Promise<void> {
  return createImageEditor(req, res, async (editor) => {
    const deg = Number.parseInt(req.params.get("deg") || "0");

    if (Number.isNaN(deg)) {
      stop(res, 400, "No angle provided");
    }

    const frames: Array<Image> = [];

    for (const image of editor) {
      const frame = image.clone();
      frame.rotate(deg);
      frames.push(frame);
    }

    return frames;
  });
}
