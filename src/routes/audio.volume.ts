import { Request, Response } from "express";
import { createFFmpegEditor } from "../tools";

export async function audioVolume(req: Request, res: Response) {
  const amount = req.query.volume as string;

  return await createFFmpegEditor(req, res, {
    args: [
      ["-f", "mp3"],
      ["-filter:a", `volume=${amount}`],
    ],
    mimetype: "audio/mp3",
    destination: "volume.mp3",
  });
}
