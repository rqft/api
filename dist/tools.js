"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillColorCode = exports.decodeImage = exports.binary = exports.base64 = exports.ConversionMethods = void 0;
const imagescript_1 = require("imagescript");
const error_1 = require("./models/error");
var ConversionMethods;
(function (ConversionMethods) {
    ConversionMethods["ENCODE"] = "encode";
    ConversionMethods["DECODE"] = "decode";
})(ConversionMethods = exports.ConversionMethods || (exports.ConversionMethods = {}));
function base64(data, method) {
    switch (method) {
        case ConversionMethods.ENCODE:
            return Buffer.from(data).toString("base64");
        case ConversionMethods.DECODE:
            return Buffer.from(data, "base64").toString();
    }
}
exports.base64 = base64;
function binary(data, method) {
    switch (method) {
        case ConversionMethods.ENCODE:
            return data
                .split("")
                .map((c) => c.charCodeAt(0).toString(2))
                .join("");
        case ConversionMethods.DECODE:
            return data
                .split("")
                .map((c) => String.fromCharCode(parseInt(c, 2)))
                .join("");
    }
}
exports.binary = binary;
async function decodeImage(data) {
    const output = await (0, imagescript_1.decode)(data, true);
    if (output instanceof imagescript_1.GIF) {
        return output[0];
    }
    return output;
}
exports.decodeImage = decodeImage;
function fillColorCode(color, opacity, response) {
    if (!color) {
        (0, error_1.stop)(response, 400, "No color provided");
        throw null;
    }
    const opacityHex = Math.round(opacity * 255).toString(16);
    if (color.startsWith("#")) {
        color = color.slice(1);
    }
    switch (color.length) {
        case 3: {
            const [r, g, b] = color.split("");
            color = r + r + g + g + b + b + opacityHex;
            break;
        }
        case 4: {
            const [r, g, b, a] = color.split("");
            color = r + r + g + g + b + b + a + a;
            break;
        }
        case 6: {
            color = color + opacityHex;
            break;
        }
        case 8: {
            break;
        }
        default: {
            (0, error_1.stop)(response, 400, "Invalid hex code");
            throw null;
        }
    }
    return parseInt(color, 16);
}
exports.fillColorCode = fillColorCode;
