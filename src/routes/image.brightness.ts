import express from "express";
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

    editor.lightness(amount, scaled);

    return editor;
  });
}
