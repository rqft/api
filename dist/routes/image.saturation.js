"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageSaturation = void 0;
const error_1 = require("../models/error");
const tools_1 = require("../tools");
async function imageSaturation(req, res) {
    return (0, tools_1.createImageEditor)(req, res, async (editor) => {
        const amount = Number(req.params.amount || 1);
        const scaled = req.query.scaled === "true";
        if (Number.isNaN(amount)) {
            (0, error_1.stop)(res, 400, "No amount provided");
        }
        editor.saturation(amount, scaled);
        return editor;
    });
}
exports.imageSaturation = imageSaturation;
