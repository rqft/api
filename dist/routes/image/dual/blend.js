"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageDualOverlay = void 0;
const tools_1 = require("../../../tools");
async function imageDualOverlay(req, res) {
    return (0, tools_1.createDualEditor)(req, res, async (source, target) => {
        const frames = [];
        for (const [a, b] of (0, tools_1.zip)(source, target)) {
            a.composite(b.opacity(0.5), 0, 0);
            frames.push(a);
        }
        return frames;
    });
}
exports.imageDualOverlay = imageDualOverlay;
