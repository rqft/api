"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageDualXor = void 0;
const pixel_ops_1 = require("./pixel-ops");
exports.imageDualXor = (0, pixel_ops_1.pixelOps)(([r, g, b, a], [h, s, l, v]) => {
    return [r ^ h, g ^ s, b ^ l, (a + v) / 2];
});
