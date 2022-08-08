"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpandPixel = exports.PixelColors = exports.RawPixelColors = void 0;
var RawPixelColors;
(function (RawPixelColors) {
    RawPixelColors[RawPixelColors["WHITE"] = 4294967295] = "WHITE";
    RawPixelColors[RawPixelColors["BLACK"] = 255] = "BLACK";
    RawPixelColors[RawPixelColors["RED"] = 4278190335] = "RED";
    RawPixelColors[RawPixelColors["GREEN"] = 16711935] = "GREEN";
    RawPixelColors[RawPixelColors["BLUE"] = 65535] = "BLUE";
    RawPixelColors[RawPixelColors["YELLOW"] = 4294902015] = "YELLOW";
    RawPixelColors[RawPixelColors["CYAN"] = 16777215] = "CYAN";
    RawPixelColors[RawPixelColors["MAGENTA"] = 4278255615] = "MAGENTA";
})(RawPixelColors = exports.RawPixelColors || (exports.RawPixelColors = {}));
var PixelColors;
(function (PixelColors) {
    PixelColors[PixelColors["WHITE"] = 7] = "WHITE";
    PixelColors[PixelColors["BLACK"] = 0] = "BLACK";
    PixelColors[PixelColors["RED"] = 4] = "RED";
    PixelColors[PixelColors["GREEN"] = 2] = "GREEN";
    PixelColors[PixelColors["BLUE"] = 1] = "BLUE";
    PixelColors[PixelColors["CYAN"] = 3] = "CYAN";
    PixelColors[PixelColors["MAGENTA"] = 5] = "MAGENTA";
    PixelColors[PixelColors["YELLOW"] = 6] = "YELLOW";
})(PixelColors = exports.PixelColors || (exports.PixelColors = {}));
exports.ExpandPixel = {
    [PixelColors.WHITE]: RawPixelColors.WHITE,
    [PixelColors.BLACK]: RawPixelColors.BLACK,
    [PixelColors.RED]: RawPixelColors.RED,
    [PixelColors.GREEN]: RawPixelColors.GREEN,
    [PixelColors.BLUE]: RawPixelColors.BLUE,
    [PixelColors.CYAN]: RawPixelColors.CYAN,
    [PixelColors.MAGENTA]: RawPixelColors.MAGENTA,
    [PixelColors.YELLOW]: RawPixelColors.YELLOW,
};
