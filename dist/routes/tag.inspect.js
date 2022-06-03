"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagInspect = void 0;
const globals_1 = require("../globals");
const result_1 = require("../models/result");
function tagInspect(_req, res) {
    (0, result_1.give)(res, globals_1.KV.tags.read());
}
exports.tagInspect = tagInspect;
