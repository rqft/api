"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagDelete = void 0;
const globals_1 = require("../../globals");
const result_1 = require("../../models/result");
function tagDelete(req, res) {
    const key = req.params.get('key');
    if (key) {
        const value = globals_1.KV.tags.get(key);
        if (value) {
            globals_1.KV.tags.delete(key);
            (0, result_1.give)(res, true);
        }
        else {
            (0, result_1.stop)(res, 404, 'Key not found');
        }
    }
    else {
        (0, result_1.stop)(res, 400, 'Missing required path parameter \'key\'');
    }
}
exports.tagDelete = tagDelete;
