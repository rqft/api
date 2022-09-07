"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mathjs = exports.CanvasSize = exports.KV = exports.Sarah = void 0;
const http_1 = require("@rqft/http");
const kv_1 = require("@rqft/kv");
const mathjs_1 = require("mathjs");
exports.Sarah = new http_1.Client({ port: 3000 });
var KV;
(function (KV) {
    KV.prefixes = new kv_1.Wilson("kv/prefixes");
    KV.tags = new kv_1.Wilson("kv/tags");
    KV.colors = new kv_1.Wilson("kv/colors");
    KV.mutes = new kv_1.Wilson("kv/mutes");
    KV.todo = new kv_1.Wilson("kv/todo");
    KV.pixel = new kv_1.Wilson("kv/pixel");
    KV.kv = new kv_1.Wilson("kv/kv");
})(KV = exports.KV || (exports.KV = {}));
exports.CanvasSize = 4;
exports.mathjs = (0, mathjs_1.create)(mathjs_1.all, { matrix: "Array", predictable: false });
