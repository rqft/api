import { Input, Output } from "@rqft/http";
import { give, stop } from "../models/result";
export function textConvert(
  req: Input<"/text/convert/{conversion}/{method}">,
  res: Output
): void {
  const conversion = req.params.get("conversion") as Conversion;
  const method = req.params.get("method") as ConversionMethods;

  const data = req.query.get("data") as string | undefined;

  if (!data) {
    stop(res, 400, "No data provided");
  }

  const result = Encoders[conversion][method](data, req.query.toJSON());

  return give(res, result);
}

export enum ConversionMethods {
  ENCODE = "encode",
  DECODE = "decode",
}

export enum Conversion {
  BASE64 = "base64",
  BINARY = "binary",
  HEX = "hex",
  CAESAR = "caesar",
}

export type Encoder<T> = (data: string, options: T) => string;

export type Converter = Record<ConversionMethods, Encoder<any>>;

export const Encoders: Record<Conversion, Converter> = {
  [Conversion.BASE64]: {
    [ConversionMethods.ENCODE]: (data) => Buffer.from(data).toString("base64"),
    [ConversionMethods.DECODE]: (data) =>
      Buffer.from(data, "base64").toString(),
  },
  [Conversion.BINARY]: {
    [ConversionMethods.ENCODE]: (data) =>
      data
        .split("")
        .map((c) => c.charCodeAt(0).toString(2))
        .join(" "),
    [ConversionMethods.DECODE]: (data) =>
      data
        .split(" ")
        .map((c) => String.fromCharCode(parseInt(c, 2)))
        .join(""),
  },
  [Conversion.HEX]: {
    [ConversionMethods.ENCODE]: (data) => Buffer.from(data).toString("hex"),
    [ConversionMethods.DECODE]: (data) => Buffer.from(data, "hex").toString(),
  },
  [Conversion.CAESAR]: {
    [ConversionMethods.ENCODE]: (data, options) =>
      caesar(data, ConversionMethods.ENCODE, options.shift),
    [ConversionMethods.DECODE]: (data, options) =>
      caesar(data, ConversionMethods.DECODE, options.shift),
  },
};

export interface CaesarOptions {
  shift: number;
}

export function caesar(
  data: string,
  method: ConversionMethods,
  options: CaesarOptions
) {
  const shift = options.shift;
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  return data
    .split("")
    .map((c) => {
      const index = alphabet.indexOf(c.toLowerCase());
      if (index === -1) {
        return c;
      }

      const newIndex =
        (index + shift * (method === ConversionMethods.DECODE ? -1 : 1)) %
        alphabet.length;
      return alphabet[newIndex]!.toUpperCase();
    })
    .join("");
}
