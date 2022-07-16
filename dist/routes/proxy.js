"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxy = void 0;
const result_1 = require("../models/result");
const tools_1 = require("../tools");
function proxy(req, res) {
    const url = req.query.get("url");
    if (!url) {
        (0, result_1.stop)(res, 400, "url is required");
    }
    const r = (0, tools_1.fetch)(url, req.method, "text", {
        headers: req.headers.toJSON(),
        body: req.body,
    });
    (0, result_1.give)(res, r);
}
exports.proxy = proxy;
