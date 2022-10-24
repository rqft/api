import { Constants, Payload, Requester } from "@rqft/fetch";
import { Input, Output } from "@rqft/http";
import { Wilson } from "@rqft/kv";
import { decode, Frame, GIF, Image } from "imagescript";

import { Request } from "node-fetch";
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { CanvasSize } from "./globals";
import { stop } from "./models/result";
import { Action, ExpandPixel } from "./types";

export async function decodeImage(
  data: Buffer | Uint8Array,
  first?: true
): Promise<Image>;
export async function decodeImage(
  data: Buffer | Uint8Array,
  first?: false
): Promise<Array<Image>>;
export async function decodeImage(
  data: Buffer | Uint8Array,
  first?: boolean
): Promise<Array<Image> | Image> {
  const output = await decode(data, first);
  if (output instanceof Image) {
    if (first) {
      return output;
    }

    return [output];
  }

  if (first) {
    if (0 in output) {
      return output[0]!;
    }
  }

  return output;
}
export function fillColorCode(
  color: string | undefined,
  opacity: number,
  response: Output
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

export type ArrayOr<T> = T | Array<T>;
export type PromiseOr<T> = T | Promise<T>;

export async function createImageEditor<T extends string = string>(
  req: Input<T>,
  res: Output,
  callee: (
    editor: Array<Image>
  ) => PromiseOr<ArrayOr<Image>> | PromiseOr<ArrayOr<Frame>> | never
) {
  const url = req.query.get("url");

  if (url) {
    const payload = await fetch(
      url,
      Constants.HTTPVerbs.GET,
      "buffer"
    );

    let editor: Awaited<ReturnType<typeof callee>> = await decodeImage(
      payload.unwrap(),
      false
    );

    if (!Array.isArray(editor)) {
      editor = [editor];
    }

    editor = await callee(editor);

    if (!Array.isArray(editor)) {
      editor = [editor];
    }

    let u8: Uint8Array | null = null;
    let contentType: string = "image/png";
    switch (editor.length) {
      case 0: {
        stop(res, 400, "No frames found");
      }

      case 1: {
        const [image] = editor;
        u8 = await image!.encode();
        break;
      }

      default: {
        contentType = "image/gif";
        const frames: Array<Frame> = [];

        for (const image of editor) {
          if (image instanceof Frame) {
            frames.push(image);
            continue;
          }

          frames.push(Frame.from(image));
        }

        const gif = new GIF(frames);
        u8 = await gif.encode();
      }
    }

    if (u8) {
      const sent = Buffer.from(u8);
      res.setHeader("content-type", contentType);

      res.send(sent);
    }
  } else {
    stop(res, 400, "No image URL provided");
  }
}
export interface FFMpegOptions {
  args: Array<[string, string?]>;
  mimetype: string;
  destination: string;
  source: string;
}
export async function createFFmpegEditor<T extends string = string>(
  req: Input<T>,
  res: Output,
  options: FFMpegOptions
) {
  const url = req.query.get("url");

  if (url) {
    const payload = await fetch(
      url,
      Constants.HTTPVerbs.GET,
      "buffer"
    );

    
    const int = path.resolve('./input', options.source + '.' + getUrlExtension(payload.uri().href));
    console.log('writing to', int)
    writeFileSync(int, payload.unwrap());
    
    const out = path.resolve('./output', options.destination)

    const args = [
      '-i',
      int,
      ...options.args.flat(1),
      '-y',
      out,
    ];

    console.log('ffmpeg', args.join(" "))
    
    try {
      execSync(`ffmpeg ${args.join(" ")}`)
    } catch {
      console.error("what!!")
      throw null
    }

    res.setHeader("content-type", options.mimetype);
    res.setHeader(
      "content-disposition",
      `attachment; filename="${options.destination}"`
    );

    console.log('reading from ', out)
    res.send(readFileSync(out));
  } else {
    stop(res, 400, "No media URL provided");
  }
}
type Data<T> = Payload<T>
export type Transformer =
  | "arrayBuffer"
  | "json"
  | "text"
  | "blob"
  | "buffer"
  | "request";
export async function fetch(
  uri: string | URL,
  method: Constants.HTTPVerbs,
  transformer: "arrayBuffer",
  init?: import("@rqft/fetch").Constants.Options
): Promise<Data<ArrayBuffer>>;
export async function fetch<T>(
  uri: string | URL,
  method: Constants.HTTPVerbs,
  transformer: "json",
  init?: import("@rqft/fetch").Constants.Options
): Promise<Data<T>>;
export async function fetch(
  uri: string | URL,
  method: Constants.HTTPVerbs,
  transformer: "text",
  init?: import("@rqft/fetch").Constants.Options
): Promise<Data<string>>;
export async function fetch(
  uri: string | URL,
  method: Constants.HTTPVerbs,
  transformer: "blob",
  init?: import("@rqft/fetch").Constants.Options
): Promise<Data<Blob>>;
export async function fetch(
  uri: string | URL,
  method: Constants.HTTPVerbs,
  transformer: "buffer",
  init?: import("@rqft/fetch").Constants.Options
): Promise<Data<Buffer>>;
export async function fetch(
  uri: string | URL,
  method: Constants.HTTPVerbs,
  transformer: "request",
  init?: import("@rqft/fetch").Constants.Options
): Promise<Data<Request>>;

export async function fetch(
  uri: string | URL,
  method: Constants.HTTPVerbs,
  transformer: Transformer = "request",
  init?: import("@rqft/fetch").Constants.Options
) {
  return new Requester(uri)[transformer as 'json'](`${method} ` as '/', {}, init)

}

export function sleep(ms: number) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
  return;
}

export function generateCanvas(actions: Array<Action>) {
  const image = new Image(CanvasSize, CanvasSize);

  for (const action of actions) {
    const [x, y, color] = action;
    image.setPixelAt(x, y, ExpandPixel[color]);
  }

  return image;
}

export function scale(
  v: number,
  [xn, xm]: [number, number],
  [yn, ym]: [number, number]
) {
  return ((v - xn) / (xm - xn)) * (ym - yn) + yn;
}

export class IdBasedKv<T> extends Wilson<Record<string, T>> {
  public readonly guildId: string;
  constructor(guildId: string) {
    super("kv/kv");
    this.guildId = guildId;
  }

  public read() {
    const w = new Wilson<Record<string, T>>("kv/kv");
    return w.get(this.guildId) || {};
  }

  public write(data: Record<string, T>) {
    return super.put(this.guildId, data[this.guildId]!);
  }
}

export function getUrlExtension(url: string): string {
  return url.split(/[#?]/)[0]?.split('.').pop()?.trim() || '';
}