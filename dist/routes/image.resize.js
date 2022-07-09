"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageResize = void 0;
const imagescript_1 = require("imagescript/");
const result_1 = require("../models/result");
const tools_1 = require("../tools");
async function imageResize(req, res) {
    return (0, tools_1.createImageEditor)(req, res, async (editor) => {
        let size = req.params.get("size") || "1";
        const frames = [];
        for (const image of editor) {
            switch (true) {
                case /^\d+x\d+$/.test(size): {
                    const [width, height] = size.split("x").map(Number);
                    image.resize(width, height);
                    break;
                }
                case /^x\d+$/.test(size): {
                    const [, height] = size.split("x");
                    image.resize(imagescript_1.Image.RESIZE_AUTO, Number(height));
                    break;
                }
                case /^\d+x$/.test(size): {
                    const [width] = size.split("x");
                    image.resize(Number(width), imagescript_1.Image.RESIZE_AUTO);
                    break;
                }
                case /^[\d.]+$/.test(size): {
                    image.scale(Number(size));
                    break;
                }
                default: {
                    (0, result_1.stop)(res, 400, `Invalid size: ${size}`);
                }
            }
            return image;
        }
        return frames;
    });
}
exports.imageResize = imageResize;
