"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KV = exports.NeedsNoAuth = exports.Authorized = exports.Sarah = void 0;
const express_1 = __importDefault(require("express"));
const wilson_kv_1 = require("wilson-kv");
exports.Sarah = (0, express_1.default)();
exports.Authorized = [
    { username: "admin", password: "admin" },
    { username: "insyri", password: "abcd" },
    { username: "sern", password: "sern" },
];
exports.NeedsNoAuth = ["/authorized", "/endpoints"];
var KV;
(function (KV) {
    KV.prefixes = new wilson_kv_1.Wilson("kv/prefixes");
    KV.tags = new wilson_kv_1.Wilson("kv/tags");
    KV.colors = new wilson_kv_1.Wilson("kv/colors");
    KV.mutes = new wilson_kv_1.Wilson("kv/mutes");
    KV.todo = new wilson_kv_1.Wilson("kv/todo");
})(KV = exports.KV || (exports.KV = {}));
