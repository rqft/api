"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageDeepfry = void 0;
const imagescript_1 = require("imagescript");
const result_1 = require("../../models/result");
const tools_1 = require("../../tools");
async function imageDeepfry(req, res) {
    return (0, tools_1.createImageEditor)(req, res, async (editor) => {
        const threshold = Number.parseFloat(req.params.get('threshold') || '1');
        if (threshold > 0xff || threshold < 0 || Number.isNaN(threshold)) {
            (0, result_1.stop)(res, 400, `Invalid threshold '${req.params.get('threshold')}'`);
        }
        const frames = [];
        for (const frame of editor) {
            for (const [x, y, color] of frame.iterateWithColors()) {
                let [r, g, b] = imagescript_1.Image.colorToRGB(color);
                if (r < threshold) {
                    r = 0x00;
                }
                else {
                    r = 0xff;
                }
                if (g < threshold) {
                    g = 0x00;
                }
                else {
                    g = 0xff;
                }
                if (b < threshold) {
                    b = 0x00;
                }
                else {
                    b = 0xff;
                }
                frame.setPixelAt(x, y, imagescript_1.Image.rgbToColor(r, g, b));
            }
            frames.push(frame);
        }
        return frames;
    });
}
exports.imageDeepfry = imageDeepfry;
