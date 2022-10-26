"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageDualComposite = void 0;
const tools_1 = require("../../../tools");
async function imageDualComposite(req, res) {
    return (0, tools_1.createDualEditor)(req, res, async (source, target) => {
        const frames = [];
        for (const [a, b] of (0, tools_1.zip)(source, target)) {
            a.composite(b, 0, 0);
            frames.push(a);
        }
        return frames;
    });
}
exports.imageDualComposite = imageDualComposite;
