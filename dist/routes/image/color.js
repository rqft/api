"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageColor = void 0;
const imagescript_1 = require("imagescript");
const result_1 = require("../../models/result");
const tools_1 = require("../../tools");
async function imageColor(req, res) {
    let [width, height] = (req.params.get("size") || "512x512")
        .split("x")
        .map((x) => Number.parseInt(x));
    if (!width && !height) {
        (0, result_1.stop)(res, 400, "Invalid image size");
    }
    else if (!width) {
        width = height;
    }
    else if (!height) {
        height = width;
    }
    const color = (0, tools_1.fillColorCode)(req.params.get("color"), 1, res);
    const editor = new imagescript_1.Image(Number(width), Number(height)).fill(color);
    const u8 = await editor.encode();
    const sent = Buffer.from(u8);
    res.setHeader("content-type", "image/png");
    res.send(sent);
}
exports.imageColor = imageColor;
