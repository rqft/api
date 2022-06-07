import express from "express";
import { Image } from "imagescript/";
import { stop } from "../models/error";
import { createImageEditor } from "../tools";
export async function imageResize(
  req: express.Request,
  res: express.Response
): Promise<void> {
  return createImageEditor(req, res, async (editor) => {
    let size = req.params.size;
    if (!size) {
      size = "1";
    }

    switch (true) {
      case /^\d+x\d+$/.test(size): {
        const [width, height] = size.split("x").map(Number);
        editor.resize(width!, height!);
        break;
      }
      case /^x\d+$/.test(size): {
        const [, height] = size.split("x");
        editor.resize(Image.RESIZE_AUTO, Number(height));
        break;
      }
      case /^\d+x$/.test(size): {
        const [width] = size.split("x");
        editor.resize(Number(width), Image.RESIZE_AUTO);
        break;
      }
      case /^[\d.]+$/.test(size): {
        editor.scale(Number(size));
        break;
      }
      default: {
        stop(res, 400, `Invalid size: ${size}`);
      }
    }

    return editor;
  });
}
