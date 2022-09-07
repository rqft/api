"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mirror = exports.MirrorMethods = exports.imageMirror = void 0;
const result_1 = require("../../models/result");
const tools_1 = require("../../tools");
async function imageMirror(req, res) {
    return (0, tools_1.createImageEditor)(req, res, async (editor) => {
        const method = req.query.get("method") || MirrorMethods.LEFT;
        if (!(method in MirrorMethods)) {
            (0, result_1.stop)(res, 400, `Invalid method: ${method}`);
        }
        const frames = [];
        for (const frame of editor) {
            frames.push(mirror(frame, method));
        }
        return frames;
    });
}
exports.imageMirror = imageMirror;
var MirrorMethods;
(function (MirrorMethods) {
    MirrorMethods["LEFT"] = "LEFT";
    MirrorMethods["RIGHT"] = "RIGHT";
    MirrorMethods["TOP"] = "TOP";
    MirrorMethods["BOTTOM"] = "BOTTOM";
})(MirrorMethods = exports.MirrorMethods || (exports.MirrorMethods = {}));
function mirror(frame, method = MirrorMethods.LEFT) {
    for (let x = 1; x < frame.width; x++) {
        for (let y = 1; y < frame.height; y++) {
            switch (method) {
                case MirrorMethods.LEFT: {
                    const pixel = frame.getPixelAt(x, y);
                    frame.setPixelAt(frame.width - x, y, pixel);
                    break;
                }
                case MirrorMethods.RIGHT: {
                    const pixel = frame.getPixelAt(frame.width - x, y);
                    frame.setPixelAt(x, y, pixel);
                    break;
                }
                case MirrorMethods.TOP: {
                    const pixel = frame.getPixelAt(x, y);
                    frame.setPixelAt(x, frame.height - y, pixel);
                    break;
                }
                case MirrorMethods.BOTTOM: {
                    const pixel = frame.getPixelAt(x, frame.height - y);
                    frame.setPixelAt(x, y, pixel);
                    break;
                }
            }
        }
    }
    return frame;
}
exports.mirror = mirror;
