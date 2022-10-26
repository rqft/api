"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pixelOps = void 0;
const imagescript_1 = require("imagescript");
const tools_1 = require("../../../tools");
function pixelOps(f) {
    return async (req, res) => {
        return (0, tools_1.createDualEditor)(req, res, async (source, target) => {
            const frames = [];
            for (const [a, b] of (0, tools_1.zip)(source, target)) {
                for (const [x, y, color] of a.iterateWithColors()) {
                    try {
                        const r = imagescript_1.Image.colorToRGBA(color);
                        const t = b.getRGBAAt(x, y);
                        a.setPixelAt(x, y, imagescript_1.Image.rgbaToColor(...f(t, r).map(tools_1.u8)));
                    }
                    catch {
                        continue;
                    }
                }
                frames.push(a);
            }
            return frames;
        });
    };
}
exports.pixelOps = pixelOps;
