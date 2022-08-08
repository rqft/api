import { Input, Output } from "@rqft/http";
import { Frame, GIF } from "imagescript";
import { CanvasSize, KV } from "../globals";
import { Action, ExpandPixel, RawPixelColors } from "../types";

export async function pixelTimelapse(
  _: Input<"/pixel/timelapse/{frame}">,
  res: Output
): Promise<void> {
  const actions = KV.pixel.get<Array<Action>>("actions");

  if (!actions) {
    throw new Error("No actions found");
  }

  const base = new Frame(CanvasSize, CanvasSize);
  base.fill(RawPixelColors.WHITE);

  const frames: Array<Frame> = [Frame.from(base)];

  for (const action of actions) {
    const [x, y, color] = action;
    const frame = frames[frames.length - 1]!.clone();
    frame.setPixelAt(x + 1, y + 1, ExpandPixel[color]);
    frames.push(Frame.from(frame));
  }

  const gif = new GIF(frames);
  const u8 = await gif.encode();

  res.setHeader("content-type", "image/gif");
  res.send(u8);
  return;
}
