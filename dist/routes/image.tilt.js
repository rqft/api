"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageTilt = void 0;
const result_1 = require("../models/result");
const tools_1 = require("../tools");
async function imageTilt(req, res) {
    return (0, tools_1.createImageEditor)(req, res, async (editor) => {
        const amount = Number(req.params.get("amount")) || 12;
        const [image] = editor;
        if (!image) {
            (0, result_1.stop)(res, 400, "No image provided");
        }
        for (let i = 0; i < amount; i++) {
            const frame = image.clone();
            frame.rotate(i, false);
            frame.opacity(0.1);
            image.composite(frame);
        }
        return editor;
    });
}
exports.imageTilt = imageTilt;
