import { Input, Output } from "kevin-http";
import { createFFmpegEditor } from "../tools";

export async function audioVolume(req: Input, res: Output) {
  const amount = req.params.get("amount");

  return await createFFmpegEditor(req, res, {
    args: [
      ["-f", "mp3"],
      ["-filter:a", `volume=${amount}`],
    ],
    mimetype: "audio/mp3",
    destination: "volume.mp3",
  });
}
