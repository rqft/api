"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageDualDiv = exports.imageDualMul = exports.imageDualSub = exports.imageDualAdd = exports.imageDualAnd = exports.imageDualOr = exports.imageDualXor = void 0;
const pixel_ops_1 = require("./pixel-ops");
exports.imageDualXor = (0, pixel_ops_1.pixelOps)(([r, g, b, a], [h, s, l, v]) => {
    return [r ^ h, g ^ s, b ^ l, (a + v) / 2];
});
exports.imageDualOr = (0, pixel_ops_1.pixelOps)(([r, g, b, a], [h, s, l, v]) => {
    return [r | h, g | s, b | l, (a + v) / 2];
});
exports.imageDualAnd = (0, pixel_ops_1.pixelOps)(([r, g, b, a], [h, s, l, v]) => {
    return [r & h, g & s, b & l, (a + v) / 2];
});
exports.imageDualAdd = (0, pixel_ops_1.pixelOps)(([r, g, b, a], [h, s, l, v]) => {
    return [r + h, g + s, b + l, (a + v) / 2];
});
exports.imageDualSub = (0, pixel_ops_1.pixelOps)(([r, g, b, a], [h, s, l, v]) => {
    return [r - h, g - s, b - l, (a + v) / 2];
});
exports.imageDualMul = (0, pixel_ops_1.pixelOps)(([r, g, b, a], [h, s, l, v]) => {
    return [r * h, g * s, b * l, (a + v) / 2];
});
exports.imageDualDiv = (0, pixel_ops_1.pixelOps)(([r, g, b, a], [h, s, l, v]) => {
    return [r / h, g / s, b / l, (a + v) / 2];
});
