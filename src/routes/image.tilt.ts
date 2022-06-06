import express from "express";
import fetch from "node-fetch";
import { stop } from "../models/error";
import { decodeImage } from "../tools";
export async function imageTilt(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const url = req.query.url as string;
  const amount = Number(req.params.amount) || 12;
  if (url) {
    const request = await fetch(url);
    const data = await request.buffer();
    const editor = await decodeImage(data);

    for (let i = 0; i < amount; i++) {
      const frame = editor.clone();
      frame.rotate(i, false);
      frame.opacity(0.1);
      editor.composite(frame);
    }

    const u8: Uint8Array = await editor.encode();

    const sent = Buffer.from(u8);
    res.setHeader("Content-Type", "image/png");
    res.send(sent);
  } else {
    stop(res, 400, "No image URL provided");
  }
}
