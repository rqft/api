"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageFisheye = void 0;
const error_1 = require("../models/error");
const tools_1 = require("../tools");
async function imageFisheye(req, res) {
    return (0, tools_1.createImageEditor)(req, res, async (editor) => {
        const amount = Number.parseInt(req.params.amount || "2");
        if (Number.isNaN(amount)) {
            (0, error_1.stop)(res, 400, "No amount provided");
        }
        editor.fisheye(amount);
        return editor;
    });
}
exports.imageFisheye = imageFisheye;
