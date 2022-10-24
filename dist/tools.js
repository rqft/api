"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlExtension = exports.IdBasedKv = exports.scale = exports.generateCanvas = exports.sleep = exports.fetch = exports.createFFmpegEditor = exports.createImageEditor = exports.fillColorCode = exports.decodeImage = void 0;
const fetch_1 = require("@rqft/fetch");
const kv_1 = require("@rqft/kv");
const imagescript_1 = require("imagescript");
const node_child_process_1 = require("node:child_process");
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const globals_1 = require("./globals");
const result_1 = require("./models/result");
const types_1 = require("./types");
async function decodeImage(data, first) {
    const output = await (0, imagescript_1.decode)(data, first);
    if (output instanceof imagescript_1.Image) {
        if (first) {
            return output;
        }
        return [output];
    }
    if (first) {
        if (0 in output) {
            return output[0];
        }
    }
    return output;
}
exports.decodeImage = decodeImage;
function fillColorCode(color, opacity, response) {
    if (!color) {
        (0, result_1.stop)(response, 400, "No color provided");
    }
    const opacityHex = Math.round(opacity * 255).toString(16);
    if (color.startsWith("#")) {
        color = color.slice(1);
    }
    switch (color.length) {
        case 3: {
            const [r, g, b] = color.split("");
            color = r + r + g + g + b + b + opacityHex;
            break;
        }
        case 4: {
            const [r, g, b, a] = color.split("");
            color = r + r + g + g + b + b + a + a;
            break;
        }
        case 6: {
            color = color + opacityHex;
            break;
        }
        case 8: {
            break;
        }
        default: {
            (0, result_1.stop)(response, 400, "Invalid hex code");
        }
    }
    return parseInt(color, 16);
}
exports.fillColorCode = fillColorCode;
async function createImageEditor(req, res, callee) {
    const url = req.query.get("url");
    if (url) {
        const payload = await fetch(url, fetch_1.Constants.HTTPVerbs.GET, "buffer");
        let editor = await decodeImage(payload.unwrap(), false);
        if (!Array.isArray(editor)) {
            editor = [editor];
        }
        editor = await callee(editor);
        if (!Array.isArray(editor)) {
            editor = [editor];
        }
        let u8 = null;
        let contentType = "image/png";
        switch (editor.length) {
            case 0: {
                (0, result_1.stop)(res, 400, "No frames found");
            }
            case 1: {
                const [image] = editor;
                u8 = await image.encode();
                break;
            }
            default: {
                contentType = "image/gif";
                const frames = [];
                for (const image of editor) {
                    if (image instanceof imagescript_1.Frame) {
                        frames.push(image);
                        continue;
                    }
                    frames.push(imagescript_1.Frame.from(image));
                }
                const gif = new imagescript_1.GIF(frames);
                u8 = await gif.encode();
            }
        }
        if (u8) {
            const sent = Buffer.from(u8);
            res.setHeader("content-type", contentType);
            res.send(sent);
        }
    }
    else {
        (0, result_1.stop)(res, 400, "No image URL provided");
    }
}
exports.createImageEditor = createImageEditor;
async function createFFmpegEditor(req, res, options) {
    const url = req.query.get("url");
    if (url) {
        const payload = await fetch(url, fetch_1.Constants.HTTPVerbs.GET, "buffer");
        const int = node_path_1.default.resolve('./input', options.source + '.' + getUrlExtension(payload.uri().href));
        console.log('writing to', int);
        (0, node_fs_1.writeFileSync)(int, payload.unwrap());
        const out = node_path_1.default.resolve('./output', options.destination);
        const args = [
            '-i',
            int,
            ...options.args.flat(1),
            '-y',
            out,
        ];
        console.log('ffmpeg', args.join(" "));
        try {
            (0, node_child_process_1.execSync)(`ffmpeg ${args.join(" ")}`);
        }
        catch {
            console.error("what!!");
            throw null;
        }
        res.setHeader("content-type", options.mimetype);
        res.setHeader("content-disposition", `attachment; filename="${options.destination}"`);
        console.log('reading from ', out);
        res.send((0, node_fs_1.readFileSync)(out));
    }
    else {
        (0, result_1.stop)(res, 400, "No media URL provided");
    }
}
exports.createFFmpegEditor = createFFmpegEditor;
async function fetch(uri, method, transformer = "request", init) {
    return new fetch_1.Requester(uri)[transformer](`${method} `, {}, init);
}
exports.fetch = fetch;
function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
    return;
}
exports.sleep = sleep;
function generateCanvas(actions) {
    const image = new imagescript_1.Image(globals_1.CanvasSize, globals_1.CanvasSize);
    for (const action of actions) {
        const [x, y, color] = action;
        image.setPixelAt(x, y, types_1.ExpandPixel[color]);
    }
    return image;
}
exports.generateCanvas = generateCanvas;
function scale(v, [xn, xm], [yn, ym]) {
    return ((v - xn) / (xm - xn)) * (ym - yn) + yn;
}
exports.scale = scale;
class IdBasedKv extends kv_1.Wilson {
    guildId;
    constructor(guildId) {
        super("kv/kv");
        this.guildId = guildId;
    }
    read() {
        const w = new kv_1.Wilson("kv/kv");
        return w.get(this.guildId) || {};
    }
    write(data) {
        return super.put(this.guildId, data[this.guildId]);
    }
}
exports.IdBasedKv = IdBasedKv;
function getUrlExtension(url) {
    return url.split(/[#?]/)[0]?.split('.').pop()?.trim() || '';
}
exports.getUrlExtension = getUrlExtension;
