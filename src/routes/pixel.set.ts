import { Input, Output } from "@rqft/http";
import { KV } from "../globals";
import { stop } from "../models/result";
import { generateCanvas } from "../tools";
import { Action, PixelColors } from "../types";

export async function pixelInspect(
  req: Input<"/pixel/set/{x}/{y}/{color}">,
  res: Output
): Promise<void> {
  const x = Number.parseInt(req.params.get("x"));
  const y = Number.parseInt(req.params.get("y"));
  const color = req.params.get("color");

  if (Number.isNaN(x) || Number.isNaN(y)) {
    return stop(res, 400, "No x or y provided");
  }

  if (!color) {
    return stop(res, 400, "No color provided");
  }

  KV.pixel.transact("actions", (value) => {
    (<Array<Action>>value).push([
      x,
      y,
      PixelColors[color.toUpperCase() as keyof typeof PixelColors],
    ]);

    return value!;
  });

  const image = generateCanvas(KV.pixel.get<Array<Action>>("actions")!);

  const u8 = await image.encode();

  res.setHeader("content-type", "image/png");
  res.send(u8);
  return;
}
