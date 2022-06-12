import express from "express";
import { Image } from "imagescript";
import { stop } from "../models/error";
import { createImageEditor } from "../tools";
export async function imageRotate(
  req: express.Request,
  res: express.Response
): Promise<void> {
  return createImageEditor(req, res, async (editor) => {
    const deg = Number.parseInt(req.params.deg || "0");

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
