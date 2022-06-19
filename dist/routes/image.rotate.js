"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRotate = void 0;
const result_1 = require("../models/result");
const tools_1 = require("../tools");
async function imageRotate(req, res) {
    return (0, tools_1.createImageEditor)(req, res, async (editor) => {
        const deg = Number.parseInt(req.params.deg || "0");
        if (Number.isNaN(deg)) {
            (0, result_1.stop)(res, 400, "No angle provided");
        }
        const frames = [];
        for (const image of editor) {
            const frame = image.clone();
            frame.rotate(deg);
            frames.push(frame);
        }
        return frames;
    });
}
exports.imageRotate = imageRotate;
