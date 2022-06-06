"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageTint = void 0;
const imagescript_1 = require("imagescript");
const node_fetch_1 = __importDefault(require("node-fetch"));
const error_1 = require("../models/error");
const tools_1 = require("../tools");
async function imageTint(req, res) {
    const url = req.query.url;
    if (url) {
        const request = await (0, node_fetch_1.default)(url);
        const data = await request.buffer();
        const editor = await (0, tools_1.decodeImage)(data);
        const opacity = Number(req.query.opacity) || 0.5;
        if (opacity < 0 || opacity > 1) {
            (0, error_1.stop)(res, 400, "Invalid opacity");
        }
        const color = (0, tools_1.fillColorCode)(req.params.color, opacity, res);
        const copy = new imagescript_1.Image(editor.width, editor.height);
        copy.fill(color);
        editor.composite(copy);
        const u8 = await editor.encode();
        const sent = Buffer.from(u8);
        res.setHeader("Content-Type", "image/png");
        res.send(sent);
    }
    else {
        (0, error_1.stop)(res, 400, "No image URL provided");
    }
}
exports.imageTint = imageTint;
