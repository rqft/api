"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageResize = void 0;
const imagescript_1 = require("imagescript/");
const error_1 = require("../models/error");
const tools_1 = require("../tools");
async function imageResize(req, res) {
    return (0, tools_1.createImageEditor)(req, res, async (editor) => {
        let size = req.params.size;
        if (!size) {
            size = "1";
        }
        switch (true) {
            case /^\d+x\d+$/.test(size): {
                const [width, height] = size.split("x").map(Number);
                editor.resize(width, height);
                break;
            }
            case /^x\d+$/.test(size): {
                const [, height] = size.split("x");
                editor.resize(imagescript_1.Image.RESIZE_AUTO, Number(height));
                break;
            }
            case /^\d+x$/.test(size): {
                const [width] = size.split("x");
                editor.resize(Number(width), imagescript_1.Image.RESIZE_AUTO);
                break;
            }
            case /^[\d.]+$/.test(size): {
                editor.scale(Number(size));
                break;
            }
            default: {
                (0, error_1.stop)(res, 400, `Invalid size: ${size}`);
            }
        }
        return editor;
    });
}
exports.imageResize = imageResize;
