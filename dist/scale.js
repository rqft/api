"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scale = void 0;
function scale(v, [xn, xm], [yn, ym]) {
    return ((v - xn) / (xm - xn)) * (ym - yn) + yn;
}
exports.scale = scale;
