"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.audioVolume = void 0;
const tools_1 = require("../tools");
async function audioVolume(req, res) {
    const amount = req.params.amount;
    return await (0, tools_1.createFFmpegEditor)(req, res, {
        args: [
            ["-f", "mp3"],
            ["-filter:a", `volume=${amount}`],
        ],
        mimetype: "audio/mp3",
        destination: "volume.mp3",
    });
}
exports.audioVolume = audioVolume;
