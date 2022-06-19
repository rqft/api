"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageTint = void 0;
const imagescript_1 = require("imagescript");
const result_1 = require("../models/result");
const tools_1 = require("../tools");
async function imageTint(req, res) {
    return (0, tools_1.createImageEditor)(req, res, async (editor) => {
        const opacity = Number(req.query.opacity) || 0.5;
        if (opacity < 0 || opacity > 1) {
            (0, result_1.stop)(res, 400, "Invalid opacity");
        }
        const frames = [];
        for (const image of editor) {
            const color = (0, tools_1.fillColorCode)(req.params.color, opacity, res);
            const copy = new imagescript_1.Image(image.width, image.height);
            copy.fill(color);
            image.composite(copy);
            frames.push(image);
        }
        return frames;
    });
}
exports.imageTint = imageTint;
