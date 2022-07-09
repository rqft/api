import { decode, Frame, GIF, Image } from "imagescript";
import { Input, Output } from "kevin-http";
import { Request } from "node-fetch";
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { Data, Pariah } from "pariah";
import { stop } from "./models/result";

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

export async function createImageEditor(
  req: Input,
  res: Output,
  callee: (
    editor: Array<Image>
  ) => PromiseOr<ArrayOr<Image>> | PromiseOr<ArrayOr<Frame>> | never
) {
  const url = req.query.get("url");

  if (url) {
    const { payload: data } = await fetch(url, "buffer");
    let editor: Awaited<ReturnType<typeof callee>> = await decodeImage(
      data,
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
  args: Array<[string, string]>;
  mimetype: string;
  destination: string;
}
export async function createFFmpegEditor(
  req: Input,
  res: Output,
  options: FFMpegOptions
) {
  const url = req.query.get("url");

  if (url) {
    const { payload: data } = await fetch(url, "buffer");

    const args = [
      "-y",
      "-i",
      "-",
      ...options.args.flat(1),
      `output/${options.destination}`,
    ];

    execSync(`ffmpeg ${args.join(" ")}`, { input: data });

    res.setHeader("content-type", options.mimetype);
    res.setHeader(
      "content-disposition",
      `attachment; filename="${options.destination}"`
    );

    res.send(readFileSync(`output/${options.destination}`));
  } else {
    stop(res, 400, "No media URL provided");
  }
}
export type Transformer =
  | "arrayBuffer"
  | "json"
  | "text"
  | "blob"
  | "buffer"
  | "request";
export async function fetch(
  uri: string | URL,
  transformer: "arrayBuffer"
): Promise<Data<ArrayBuffer>>;
export async function fetch<T>(
  uri: string | URL,
  transformer: "json"
): Promise<Data<T>>;
export async function fetch(
  uri: string | URL,
  transformer: "text"
): Promise<Data<string>>;
export async function fetch(
  uri: string | URL,
  transformer: "blob"
): Promise<Data<Blob>>;
export async function fetch(
  uri: string | URL,
  transformer: "buffer"
): Promise<Data<Buffer>>;
export async function fetch(
  uri: string | URL,
  transformer: "request"
): Promise<Data<Request>>;

export async function fetch(
  uri: string | URL,
  transformer: Transformer = "request"
) {
  const url = new URL(uri);
  const pariah = new Pariah(url);

  return pariah[transformer]("/");
}
