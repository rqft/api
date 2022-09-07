"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageSaturation = void 0;
const result_1 = require("../../models/result");
const tools_1 = require("../../tools");
async function imageSaturation(req, res) {
    return (0, tools_1.createImageEditor)(req, res, async (editor) => {
        const amount = Number(req.params.get("amount") || 1);
        const scaled = req.query.get("scaled") === "true";
        if (Number.isNaN(amount)) {
            (0, result_1.stop)(res, 400, "No amount provided");
        }
        const frames = [];
        for (const frame of editor) {
            const image = frame.clone();
            image.saturation(amount, scaled);
            frames.push(image);
        }
        return frames;
    });
}
exports.imageSaturation = imageSaturation;
