"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFFmpegEditor = exports.createImageEditor = exports.fillColorCode = exports.decodeImage = void 0;
const imagescript_1 = require("imagescript");
const node_fetch_1 = __importDefault(require("node-fetch"));
const node_child_process_1 = require("node:child_process");
const node_fs_1 = require("node:fs");
const result_1 = require("./models/result");
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
    const url = req.query.url;
    if (url) {
        const request = await (0, node_fetch_1.default)(url);
        const data = await request.buffer();
        let editor = await decodeImage(data, false);
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
            res.setHeader("Content-Type", contentType);
            res.send(sent);
        }
    }
    else {
        (0, result_1.stop)(res, 400, "No image URL provided");
    }
}
exports.createImageEditor = createImageEditor;
async function createFFmpegEditor(req, res, options) {
    const url = req.query.url;
    if (url) {
        const request = await (0, node_fetch_1.default)(url);
        const data = await request.buffer();
        const args = [
            "-y",
            "-i",
            "-",
            ...options.args.flat(1),
            `output/${options.destination}`,
        ];
        (0, node_child_process_1.execSync)(`ffmpeg ${args.join(" ")}`, { input: data });
        res.setHeader("Content-Type", options.mimetype);
        res.setHeader("Content-Disposition", `attachment; filename="${options.destination}"`);
        res.send((0, node_fs_1.readFileSync)(`output/${options.destination}`));
    }
    else {
        (0, result_1.stop)(res, 400, "No media URL provided");
    }
}
exports.createFFmpegEditor = createFFmpegEditor;
