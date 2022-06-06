import { Response } from "express";
import { decode, GIF, Image } from "imagescript";
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
    throw null;
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
      throw null;
    }
  }

  return parseInt(color, 16);
}
