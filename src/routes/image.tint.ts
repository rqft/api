import express from "express";
import { Image } from "imagescript";
import fetch from "node-fetch";
import { stop } from "../models/error";
import { decodeImage, fillColorCode } from "../tools";

export async function imageTint(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const url = req.query.url as string;
  if (url) {
    const request = await fetch(url);
    const data = await request.buffer();
    const editor = await decodeImage(data);

    const opacity = Number(req.query.opacity) || 0.5;

    if (opacity < 0 || opacity > 1) {
      stop(res, 400, "Invalid opacity");
    }

    const color = fillColorCode(req.params.color, opacity, res);

    const copy = new Image(editor.width, editor.height);
    copy.fill(color);
    editor.composite(copy);

    const u8: Uint8Array = await editor.encode();

    const sent = Buffer.from(u8);
    res.setHeader("Content-Type", "image/png");
    res.send(sent);
  } else {
    stop(res, 400, "No image URL provided");
  }
}
