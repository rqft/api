import express from "express";
import { stop } from "../models/error";
import { createImageEditor } from "../tools";
export async function imageTilt(
  req: express.Request,
  res: express.Response
): Promise<void> {
  return createImageEditor(req, res, async (editor) => {
    const amount = Number(req.params.amount) || 12;

    const [image] = editor;

    if (!image) {
      stop(res, 400, "No image provided");
    }

    for (let i = 0; i < amount; i++) {
      const frame = image.clone();
      frame.rotate(i, false);
      frame.opacity(0.1);
      image.composite(frame);
    }

    return editor;
  });
}
