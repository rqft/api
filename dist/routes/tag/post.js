"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagPost = void 0;
const globals_1 = require("../../globals");
const result_1 = require("../../models/result");
function tagPost(req, res) {
    const key = req.params.get("key");
    const value = req.query.get("value");
    if (key && value) {
        globals_1.KV.tags.put(key, value);
        (0, result_1.give)(res, true);
    }
    else {
        (0, result_1.stop)(res, 400, "Missing required path parameter 'key' or 'value'");
    }
}
exports.tagPost = tagPost;
