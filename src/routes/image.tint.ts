import express from "express";
import { Image } from "imagescript";
import { stop } from "../models/error";
import { createImageEditor, fillColorCode } from "../tools";

export async function imageTint(
  req: express.Request,
  res: express.Response
): Promise<void> {
  return createImageEditor(req, res, async (editor) => {
    const opacity = Number(req.query.opacity) || 0.5;

    if (opacity < 0 || opacity > 1) {
      stop(res, 400, "Invalid opacity");
    }

    const color = fillColorCode(req.params.color, opacity, res);

    const copy = new Image(editor.width, editor.height);
    copy.fill(color);
    editor.composite(copy);

    return editor;
  });
}
