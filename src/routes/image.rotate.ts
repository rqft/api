import express from "express";
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

    editor.rotate(deg);

    return editor;
  });
}
