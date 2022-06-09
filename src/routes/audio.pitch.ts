import { Request, Response } from "express";
import { stop } from "../models/error";
import { createFFmpegEditor } from "../tools";

export async function audioPitch(req: Request, res: Response) {
  const pitch = req.query.pitch as string;

  const amount = Number(pitch) || 0;

  if (Number.isNaN(amount)) {
    stop(res, 400, "Invalid pitch");
  }

  return await createFFmpegEditor(req, res, {
    args: [
      ["-f", "mp3"],
      ["-filter:a", `atempo=${inverse(amount)},asetrate=44100*${amount}`],
    ],
    mimetype: "audio/mp3",
    destination: "pitch.mp3",
  });
}

function inverse(x: number) {
  return 1 / x;
}
