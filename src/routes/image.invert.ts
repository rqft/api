// editor.fisheye
import express from "express";
import { stop } from "../models/error";
import { createImageEditor } from "../tools";
export async function imageInvert(
  req: express.Request,
  res: express.Response
): Promise<void> {
  return createImageEditor(req, res, async (editor) => {
    const method = (req.params.method as InvertMethods) || InvertMethods.INVERT;

    switch (method) {
      case InvertMethods.INVERT:
        editor.invert();
        break;
      case InvertMethods.INVERT_HUE:
        editor.invertHue();
        break;
      case InvertMethods.INVERT_SATURATION:
        editor.invertSaturation();
        break;
      case InvertMethods.INVERT_VALUE:
        editor.invertValue();
        break;
      default:
        stop(res, 400, "No method provided");
    }

    return editor;
  });
}

export enum InvertMethods {
  INVERT = "invert",
  INVERT_HUE = "hue",
  INVERT_SATURATION = "saturation",
  INVERT_VALUE = "value",
}
