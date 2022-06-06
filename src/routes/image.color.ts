import express from "express";
import { Image } from "imagescript/";
import { stop } from "../models/error";
import { fillColorCode } from "../tools";
export async function imageColor(
  req: express.Request,
  res: express.Response
): Promise<void> {
  let [width, height] = (req.params.size || "512x512")
    .split("x")
    .map((x) => Number.parseInt(x));
  if (!width && !height) {
    stop(res, 400, "Invalid image size");
  } else if (!width) {
    width = height!;
  } else if (!height) {
    height = width!;
  }

  const color = fillColorCode(req.params.color, 1, res);

  const editor = new Image(Number(width), Number(height)).fill(color);

  const u8: Uint8Array = await editor.encode();

  const sent = Buffer.from(u8);
  res.setHeader("Content-Type", "image/png");

  res.send(sent);
}
