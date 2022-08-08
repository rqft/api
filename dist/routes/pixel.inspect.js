"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pixelInspect = void 0;
const globals_1 = require("../globals");
const result_1 = require("../models/result");
const tools_1 = require("../tools");
async function pixelInspect(_, res) {
    const actions = globals_1.KV.pixel.get("actions");
    if (!actions) {
        return (0, result_1.stop)(res, 400, "No actions found");
    }
    const image = (0, tools_1.generateCanvas)(actions);
    const u8 = await image.encode();
    res.setHeader("content-type", "image/png");
    res.send(u8);
    return;
}
exports.pixelInspect = pixelInspect;
