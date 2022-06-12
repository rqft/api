import express from "express";
import { give } from "../models/result";
import { createImageEditor } from "../tools";
export async function imageAverageColor(
  req: express.Request,
  res: express.Response
): Promise<void> {
  return createImageEditor(req, res, async (editor) => {
    give(res, editor[0]!.averageColor());
  });
}
