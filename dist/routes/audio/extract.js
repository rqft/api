"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.audioExtract = void 0;
const tools_1 = require("../../tools");
async function audioExtract(req, res) {
    return await (0, tools_1.createFFmpegEditor)(req, res, {
        args: [],
        mimetype: "audio/mp3",
        destination: "extract.mp3",
        source: "extract"
    });
}
exports.audioExtract = audioExtract;
