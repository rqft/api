import { Input, Output } from "kevin-http";
import { stop } from "../models/result";

import { createFFmpegEditor } from "../tools";

export async function audioPitch(req: Input, res: Output) {
  const pitch = req.params.get("amount");

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
