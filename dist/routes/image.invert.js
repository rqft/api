"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvertMethods = exports.imageInvert = void 0;
const result_1 = require("../models/result");
const tools_1 = require("../tools");
async function imageInvert(req, res) {
    return (0, tools_1.createImageEditor)(req, res, async (images) => {
        const method = req.params.method || InvertMethods.INVERT;
        const frames = [];
        for (const editor of images) {
            switch (method) {
                case InvertMethods.INVERT:
                    editor.invert();
                    break;
                case InvertMethods.INVERT_HUE:
                    editor.invertHue();
                    break;
                case InvertMethods.INVERT_SATURATION:
                    editor.invertSaturation();
                    break;
                case InvertMethods.INVERT_VALUE:
                    editor.invertValue();
                    break;
                default:
                    (0, result_1.stop)(res, 400, "No method provided");
            }
            frames.push(editor);
        }
        return frames;
    });
}
exports.imageInvert = imageInvert;
var InvertMethods;
(function (InvertMethods) {
    InvertMethods["INVERT"] = "invert";
    InvertMethods["INVERT_HUE"] = "hue";
    InvertMethods["INVERT_SATURATION"] = "saturation";
    InvertMethods["INVERT_VALUE"] = "value";
})(InvertMethods = exports.InvertMethods || (exports.InvertMethods = {}));
