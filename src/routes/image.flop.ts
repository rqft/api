import { Frame, Image } from "imagescript/";
import { Input, Output } from "kevin-http";
import { stop } from "../models/result";
import { createImageEditor } from "../tools";
export async function imageFlop(req: Input, res: Output): Promise<void> {
  return createImageEditor(req, res, async (editor) => {
    const method =
      (req.query.get("method") as MirrorMethods) || MirrorMethods.LEFT;
    if (!(method in MirrorMethods)) {
      stop(res, 400, `Invalid method: ${method}`);
    }

    const frames: Array<Image> = [];

    for (const frame of editor) {
      frames.push(mirror(frame, method));
    }

    return frames;
  });
}
export enum MirrorMethods {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  TOP = "TOP",
  BOTTOM = "BOTTOM",
}
export function mirror<T extends Image | Frame>(
  frame: T,
  method: MirrorMethods = MirrorMethods.LEFT
): T {
  for (let x = 1; x < frame.width; x++) {
    for (let y = 1; y < frame.height; y++) {
      switch (method) {
        case MirrorMethods.LEFT: {
          const pixel = frame.getPixelAt(x, y);
          frame.setPixelAt(frame.width - x, y, pixel);
          break;
        }
        case MirrorMethods.RIGHT: {
          const pixel = frame.getPixelAt(frame.width - x, y);
          frame.setPixelAt(x, y, pixel);
          break;
        }
        case MirrorMethods.TOP: {
          const pixel = frame.getPixelAt(x, y);
          frame.setPixelAt(x, frame.height - y, pixel);
          break;
        }
        case MirrorMethods.BOTTOM: {
          const pixel = frame.getPixelAt(x, frame.height - y);
          frame.setPixelAt(x, y, pixel);
          break;
        }
      }
    }
  }
  return frame;
}
