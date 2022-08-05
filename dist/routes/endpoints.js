"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpoints = void 0;
const result_1 = require("../models/result");
async function endpoints(_req, res) {
    const endpoints = [];
    for (const k in _req.client.endpoints) {
        const key = k;
        const collection = _req.client.endpoints[key];
        for (const [, value] of collection) {
            endpoints.push(value.path);
        }
    }
    (0, result_1.give)(res, endpoints);
}
exports.endpoints = endpoints;
