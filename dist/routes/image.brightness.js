"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageBrightness = void 0;
const error_1 = require("../models/error");
const tools_1 = require("../tools");
async function imageBrightness(req, res) {
    return (0, tools_1.createImageEditor)(req, res, async (editor) => {
        const amount = Number.parseInt(req.params.amount || "0");
        const scaled = req.query.scaled === "true";
        if (Number.isNaN(amount)) {
            (0, error_1.stop)(res, 400, "No amount provided");
        }
        const frames = [];
        for (const frame of editor) {
            const image = frame.clone();
            image.lightness(amount, scaled);
            frames.push(image);
        }
        return frames;
    });
}
exports.imageBrightness = imageBrightness;
