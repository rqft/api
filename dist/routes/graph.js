"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graph = void 0;
const ImageScript_1 = require("imagescript/ImageScript");
const globals_1 = require("../globals");
const result_1 = require("../models/result");
const tools_1 = require("../tools");
const colors = [
    0x000000ff, 0xff0000ff, 0x00ff00ff, 0x0000ffff, 0xffff00ff, 0xff00ffff,
    0x00ffffff,
];
async function graph(i, o) {
    const e = i.query.get("expr");
    if (!e) {
        (0, result_1.stop)(o, 400, "no expressions");
    }
    const s = Number.parseInt(i.query.get("size") || "1024");
    if (Number.isNaN(s)) {
        (0, result_1.stop)(o, 400, "invalid size");
    }
    const l = new ImageScript_1.Image(s, s);
    const [h, w] = [l.height / 2, l.width / 2];
    l.fill(0xffffffff);
    function set(x, y, c) {
        return l.setPixelAt((0, tools_1.scale)(x, [-w, w], [1, l.width]), l.height - (0, tools_1.scale)(y, [-h, h], [1, l.height]) + 1, c);
    }
    for (let i = 1; i < l.width; i++) {
        l.setPixelAt(l.width / 2, i, 0x888888ff);
        l.setPixelAt(i, l.width / 2, 0x888888ff);
    }
    for (let x = -w; x < w; x++) {
        const z = e.split(";");
        if (z.length > colors.length) {
            (0, result_1.stop)(o, 400, `too many expressions (max ${colors.length})`);
        }
        for (let dx = 0; dx < z.length; dx++) {
            const dy = z[dx];
            const c = colors[dx];
            if (dy === undefined || c === undefined) {
                continue;
            }
            const y = globals_1.mathjs.evaluate(dy, { x });
            if (y > h || y < -h) {
                continue;
            }
            set(x, y, c);
        }
    }
    if (l.width < 1024) {
        l.resize(1024, 1024);
    }
    o.setHeader("content-type", "image/png");
    o.send(await l.encode());
}
exports.graph = graph;
