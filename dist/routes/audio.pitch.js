"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.audioPitch = void 0;
const error_1 = require("../models/error");
const tools_1 = require("../tools");
async function audioPitch(req, res) {
    const pitch = req.query.pitch;
    const amount = Number(pitch) || 0;
    if (Number.isNaN(amount)) {
        (0, error_1.stop)(res, 400, "Invalid pitch");
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
