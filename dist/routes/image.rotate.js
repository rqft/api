"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRotate = void 0;
const error_1 = require("../models/error");
const tools_1 = require("../tools");
async function imageRotate(req, res) {
    return (0, tools_1.createImageEditor)(req, res, async (editor) => {
        const deg = Number.parseInt(req.params.deg || "0");
        if (Number.isNaN(deg)) {
            (0, error_1.stop)(res, 400, "No angle provided");
        }
        editor.rotate(deg);
        return editor;
    });
}
exports.imageRotate = imageRotate;
