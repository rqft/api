"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.math = void 0;
const globals_1 = require("../globals");
const result_1 = require("../models/result");
function math(i, o) {
    console.log('on lh');
    let z;
    try {
        z = globals_1.mathjs.evaluate(i.query.get('expr'));
    }
    catch (e) {
        (0, result_1.stop)(o, 500, e.message);
    }
    if (z === undefined) {
        (0, result_1.give)(o, 0);
    }
    (0, result_1.give)(o, z);
}
exports.math = math;
