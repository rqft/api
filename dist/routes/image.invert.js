"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvertMethods = exports.imageInvert = void 0;
const error_1 = require("../models/error");
const tools_1 = require("../tools");
async function imageInvert(req, res) {
    return (0, tools_1.createImageEditor)(req, res, async (editor) => {
        const method = req.params.method || InvertMethods.INVERT;
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
                (0, error_1.stop)(res, 400, "No method provided");
        }
        return editor;
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
