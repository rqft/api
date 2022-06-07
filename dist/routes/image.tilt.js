"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageTilt = void 0;
const tools_1 = require("../tools");
async function imageTilt(req, res) {
    return (0, tools_1.createImageEditor)(req, res, async (editor) => {
        const amount = Number(req.params.amount) || 12;
        for (let i = 0; i < amount; i++) {
            const frame = editor.clone();
            frame.rotate(i, false);
            frame.opacity(0.1);
            editor.composite(frame);
        }
        return editor;
    });
}
exports.imageTilt = imageTilt;
