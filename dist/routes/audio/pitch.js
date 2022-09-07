"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.audioPitch = void 0;
const result_1 = require("../../models/result");
const tools_1 = require("../../tools");
async function audioPitch(req, res) {
    const pitch = req.params.get("amount");
    const amount = Number(pitch) || 0;
    if (Number.isNaN(amount)) {
        (0, result_1.stop)(res, 400, "Invalid pitch");
    }
    return await (0, tools_1.createFFmpegEditor)(req, res, {
        args: [
            ["-f", "mp3"],
            ["-filter:a", `atempo=${inverse(amount)},asetrate=44100*${amount}`],
        ],
        mimetype: "audio/mp3",
        destination: "pitch.mp3",
    });
}
exports.audioPitch = audioPitch;
function inverse(x) {
    return 1 / x;
}
