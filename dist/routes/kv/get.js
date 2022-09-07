"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kvWrite = exports.kvRead = void 0;
const globals_1 = require("../../globals");
const result_1 = require("../../models/result");
function kvRead(input, output) {
    return (0, result_1.give)(output, globals_1.KV.kv.get(input.params.get("guildId")));
}
exports.kvRead = kvRead;
function kvWrite(input, output) {
    const i = input.params.get("guildId");
    return (0, result_1.give)(output, globals_1.KV.kv.put(i, JSON.parse(input.body)).get(i));
}
exports.kvWrite = kvWrite;
