// editor.fisheye
import express from "express";
import { stop } from "../models/error";
import { createImageEditor } from "../tools";
export async function imageFisheye(
  req: express.Request,
  res: express.Response
): Promise<void> {
  return createImageEditor(req, res, async (editor) => {
    const amount = Number.parseInt(req.params.amount || "0");

    if (Number.isNaN(amount)) {
      stop(res, 400, "No amount provided");
    }

    editor.fisheye(amount);

    return editor;
  });
}
