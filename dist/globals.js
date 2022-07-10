"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KV = exports.Sarah = void 0;
const kevin_http_1 = require("kevin-http");
const wilson_kv_1 = require("wilson-kv");
exports.Sarah = new kevin_http_1.Client({ port: 3000 });
var KV;
(function (KV) {
    KV.prefixes = new wilson_kv_1.Wilson("kv/prefixes");
    KV.tags = new wilson_kv_1.Wilson("kv/tags");
    KV.colors = new wilson_kv_1.Wilson("kv/colors");
    KV.mutes = new wilson_kv_1.Wilson("kv/mutes");
    KV.todo = new wilson_kv_1.Wilson("kv/todo");
})(KV = exports.KV || (exports.KV = {}));
