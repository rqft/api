"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageTint = void 0;
const imagescript_1 = require("imagescript");
const error_1 = require("../models/error");
const tools_1 = require("../tools");
async function imageTint(req, res) {
    return (0, tools_1.createImageEditor)(req, res, async (editor) => {
        const opacity = Number(req.query.opacity) || 0.5;
        if (opacity < 0 || opacity > 1) {
            (0, error_1.stop)(res, 400, "Invalid opacity");
        }
        const color = (0, tools_1.fillColorCode)(req.params.color, opacity, res);
        const copy = new imagescript_1.Image(editor.width, editor.height);
        copy.fill(color);
        editor.composite(copy);
        return editor;
    });
}
exports.imageTint = imageTint;
