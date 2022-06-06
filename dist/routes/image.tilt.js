"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageTilt = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const error_1 = require("../models/error");
const tools_1 = require("../tools");
async function imageTilt(req, res) {
    const url = req.query.url;
    const amount = Number(req.params.amount) || 12;
    if (url) {
        const request = await (0, node_fetch_1.default)(url);
        const data = await request.buffer();
        const editor = await (0, tools_1.decodeImage)(data);
        for (let i = 0; i < amount; i++) {
            const frame = editor.clone();
            frame.rotate(i, false);
            frame.opacity(0.1);
            editor.composite(frame);
        }
        const u8 = await editor.encode();
        const sent = Buffer.from(u8);
        res.setHeader("Content-Type", "image/png");
        res.send(sent);
    }
    else {
        (0, error_1.stop)(res, 400, "No image URL provided");
    }
}
exports.imageTilt = imageTilt;
