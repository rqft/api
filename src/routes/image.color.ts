import { Image } from "imagescript";
import { Input, Output } from "kevin-http";
import { stop } from "../models/result";
import { fillColorCode } from "../tools";
export async function imageColor(
  req: Input<"/image/color/{size}/{color}">,
  res: Output
): Promise<void> {
  let [width, height] = (req.params.get("size") || "512x512")
    .split("x")
    .map((x) => Number.parseInt(x));
  if (!width && !height) {
    stop(res, 400, "Invalid image size");
  } else if (!width) {
    width = height!;
  } else if (!height) {
    height = width!;
  }

  const color = fillColorCode(req.params.get("color"), 1, res);

  const editor = new Image(Number(width), Number(height)).fill(color);

  const u8: Uint8Array = await editor.encode();

  const sent = Buffer.from(u8);
  res.setHeader("content-type", "image/png");

  res.send(sent);
}
