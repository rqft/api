import express from "express";
import { createImageEditor } from "../tools";
export async function imageTilt(
  req: express.Request,
  res: express.Response
): Promise<void> {
  return createImageEditor(req, res, async (editor) => {
    const amount = Number(req.params.amount) || 12;

    for (let i = 0; i < amount; i++) {
      const frame = editor.clone();
      frame.rotate(i, false);
      frame.opacity(0.1);
      editor.composite(frame);
    }

    return editor;
  });
}
