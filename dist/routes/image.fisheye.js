"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageFisheye = void 0;
const result_1 = require("../models/result");
const tools_1 = require("../tools");
async function imageFisheye(req, res) {
    return (0, tools_1.createImageEditor)(req, res, async (editor) => {
        const amount = Number.parseInt(req.params.amount || "2");
        if (Number.isNaN(amount)) {
            (0, result_1.stop)(res, 400, "No amount provided");
        }
        const frames = [];
        for (const image of editor) {
            const frame = image.clone();
            frame.fisheye(amount);
            frames.push(frame);
        }
        return frames;
    });
}
exports.imageFisheye = imageFisheye;
