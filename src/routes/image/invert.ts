// editor.fisheye
import { Input, Output } from "@rqft/http";
import { Image } from "imagescript";
import { stop } from "../../models/result";
import { createImageEditor } from "../../tools";
export async function imageInvert(
  req: Input<"/image/invert/{method}">,
  res: Output
): Promise<void> {
  return createImageEditor(req, res, async (images) => {
    const method =
      (req.params.get("method") as InvertMethods) || InvertMethods.INVERT;

    const frames: Array<Image> = [];

    for (const editor of images) {
      switch (method) {
        case InvertMethods.INVERT:
          editor.invert();
          break;
        case InvertMethods.INVERT_HUE:
          editor.invertHue();
          break;
        case InvertMethods.INVERT_SATURATION:
          editor.invertSaturation();
          break;
        case InvertMethods.INVERT_VALUE:
          editor.invertValue();
          break;
        default:
          stop(res, 400, "No method provided");
      }

      frames.push(editor);
    }

    return frames;
  });
}

export enum InvertMethods {
  INVERT = "invert",
  INVERT_HUE = "hue",
  INVERT_SATURATION = "saturation",
  INVERT_VALUE = "value",
}
