"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pixelTimelapse = void 0;
const imagescript_1 = require("imagescript");
const globals_1 = require("../../globals");
const types_1 = require("../../types");
async function pixelTimelapse(_, res) {
    const actions = globals_1.KV.pixel.get('actions');
    if (!actions) {
        throw new Error('No actions found');
    }
    const base = new imagescript_1.Frame(globals_1.CanvasSize, globals_1.CanvasSize);
    base.fill(types_1.RawPixelColors.WHITE);
    const frames = [imagescript_1.Frame.from(base)];
    for (const action of actions) {
        const [x, y, color] = action;
        const frame = frames[frames.length - 1].clone();
        frame.setPixelAt(x + 1, y + 1, types_1.ExpandPixel[color]);
        frames.push(imagescript_1.Frame.from(frame));
    }
    const gif = new imagescript_1.GIF(frames);
    const u8 = await gif.encode();
    res.setHeader('content-type', 'image/gif');
    res.send(u8);
    return;
}
exports.pixelTimelapse = pixelTimelapse;
