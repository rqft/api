"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageAverageColor = void 0;
const result_1 = require("../models/result");
const tools_1 = require("../tools");
async function imageAverageColor(req, res) {
    return (0, tools_1.createImageEditor)(req, res, async (editor) => {
        (0, result_1.give)(res, editor[0].averageColor());
    });
}
exports.imageAverageColor = imageAverageColor;
