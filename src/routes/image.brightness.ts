import express from "express";
import { Image } from "imagescript";
import { stop } from "../models/error";
import { createImageEditor } from "../tools";
export async function imageBrightness(
  req: express.Request,
  res: express.Response
): Promise<void> {
  return createImageEditor(req, res, async (editor) => {
    const amount = Number.parseInt(req.params.amount || "0");
    const scaled = req.query.scaled === "true";

    if (Number.isNaN(amount)) {
      stop(res, 400, "No amount provided");
    }

    const frames: Array<Image> = [];

    for (const frame of editor) {
      const image = frame.clone();
      image.lightness(amount, scaled);
      frames.push(image);
    }

    return frames;
  });
}
