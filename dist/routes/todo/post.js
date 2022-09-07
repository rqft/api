"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoPost = void 0;
const globals_1 = require("../../globals");
const result_1 = require("../../models/result");
async function todoPost(req, res) {
    const userId = req.params.get("userId");
    if (userId) {
        const existing = globals_1.KV.todo.get(userId) || [];
        const todo = req.query.get("data");
        if (todo) {
            existing.push(todo);
            globals_1.KV.todo.put(userId, existing);
            (0, result_1.give)(res, true);
        }
        else {
            (0, result_1.stop)(res, 400, "No todo provided");
        }
    }
    else {
        (0, result_1.stop)(res, 400, "No user provided");
    }
}
exports.todoPost = todoPost;
