"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fallback = void 0;
const result_1 = require("../models/result");
function fallback(req, res) {
    (0, result_1.stop)(res, 404, `Cannot ${req.method} ${req.path}`);
}
exports.fallback = fallback;
