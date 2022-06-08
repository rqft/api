import { Request, Response } from "express";
import { decode, GIF, Image } from "imagescript";
import fetch from "node-fetch";
import { stop } from "./models/error";

export enum ConversionMethods {
  ENCODE = "encode",
  DECODE = "decode",
}
export function base64(data: string, method: ConversionMethods): string {
  switch (method) {
    case ConversionMethods.ENCODE:
      return Buffer.from(data).toString("base64");
    case ConversionMethods.DECODE:
      return Buffer.from(data, "base64").toString();
  }
}
export function binary(data: string, method: ConversionMethods) {
  switch (method) {
    case ConversionMethods.ENCODE:
      return data
        .split("")
        .map((c) => c.charCodeAt(0).toString(2))
        .join("");
    case ConversionMethods.DECODE:
      return data
        .split("")
        .map((c) => String.fromCharCode(parseInt(c, 2)))
        .join("");
  }
}
export async function decodeImage(data: Buffer | Uint8Array): Promise<Image> {
  const output = await decode(data, true);
  if (output instanceof GIF) {
    return output[0] as unknown as Image;
  }
  return output;
}
export function fillColorCode(
  color: string | undefined,
  opacity: number,
  response: Response
) {
  if (!color) {
    stop(response, 400, "No color provided");
  }

  const opacityHex = Math.round(opacity * 255).toString(16);

  if (color.startsWith("#")) {
    color = color.slice(1);
  }
  switch (color.length) {
    case 3: {
      const [r, g, b] = color.split("");
      color = r! + r + g + g + b + b + opacityHex;
      break;
    }
    case 4: {
      const [r, g, b, a] = color.split("");
      color = r! + r + g + g + b + b + a + a;
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
      stop(response, 400, "Invalid hex code");
    }
  }

  return parseInt(color, 16);
}

export async function createImageEditor(
  req: Request,
  res: Response,
  callee: (editor: Image) => Image | Promise<Image> | never
) {
  const url = req.query.url as string;

  if (url) {
    const request = await fetch(url);
    const data = await request.buffer();
    let editor = await decodeImage(data);

    editor = await callee(editor);

    const u8: Uint8Array = await editor.encode();

    const sent = Buffer.from(u8);
    res.setHeader("Content-Type", "image/png");

    res.send(sent);
  } else {
    stop(res, 400, "No image URL provided");
  }
}
