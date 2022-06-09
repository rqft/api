// ffmpeg -i - output.mp3import { Request, Response } from "express";
import { Request, Response } from "express";
import { createFFmpegEditor } from "../tools";

export async function audioExtract(req: Request, res: Response) {
  return await createFFmpegEditor(req, res, {
    args: [],
    mimetype: "audio/mp3",
    destination: "extract.mp3",
  });
}
