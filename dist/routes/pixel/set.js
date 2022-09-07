"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pixelInspect = void 0;
const globals_1 = require("../../globals");
const result_1 = require("../../models/result");
const tools_1 = require("../../tools");
const types_1 = require("../../types");
async function pixelInspect(req, res) {
    const x = Number.parseInt(req.params.get("x"));
    const y = Number.parseInt(req.params.get("y"));
    const color = req.params.get("color");
    if (Number.isNaN(x) || Number.isNaN(y)) {
        return (0, result_1.stop)(res, 400, "No x or y provided");
    }
    if (!color) {
        return (0, result_1.stop)(res, 400, "No color provided");
    }
    globals_1.KV.pixel.transact("actions", (value) => {
        value.push([
            x,
            y,
            types_1.PixelColors[color.toUpperCase()],
        ]);
        return value;
    });
    const image = (0, tools_1.generateCanvas)(globals_1.KV.pixel.get("actions"));
    const u8 = await image.encode();
    res.setHeader("content-type", "image/png");
    res.send(u8);
    return;
}
exports.pixelInspect = pixelInspect;
