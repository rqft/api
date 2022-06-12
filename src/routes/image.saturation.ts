import express from "express";
import { Image } from "imagescript";
import { stop } from "../models/error";
import { createImageEditor } from "../tools";
export async function imageSaturation(
  req: express.Request,
  res: express.Response
): Promise<void> {
  return createImageEditor(req, res, async (editor) => {
    const amount = Number(req.params.amount || 1);
    const scaled = req.query.scaled === "true";

    if (Number.isNaN(amount)) {
      stop(res, 400, "No amount provided");
    }

    const frames: Array<Image> = [];

    for (const frame of editor) {
      const image = frame.clone();
      image.saturation(amount, scaled);
      frames.push(image);
    }

    return frames;
  });
}
