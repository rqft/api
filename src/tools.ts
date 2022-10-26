/* eslint-disable @typescript-eslint/consistent-type-imports */
import type { Payload } from '@rqft/fetch';
import { Constants, Requester } from '@rqft/fetch';
import type { Input, Output } from '@rqft/http';
import { Wilson } from '@rqft/kv';
import { V } from '@rqft/kv/dist/types';
import { decode, Frame, GIF, Image } from 'imagescript';

import type { Request } from 'node-fetch';
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { CanvasSize } from './globals';
import { stop } from './models/result';
import type { Action } from './types';
import { ExpandPixel } from './types';

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
      return output[0] as never;
    }
  }

  return output;
}
export function fillColorCode(
  color: string | undefined,
  opacity: number,
  response: Output
): number {
  if (!color) {
    stop(response, 400, 'No color provided');
  }

  const opacityHex = Math.round(opacity * 255).toString(16);

  if (color.startsWith('#')) {
    color = color.slice(1);
  }
  switch (color.length) {
  case 3: {
    const [r, g, b] = color.split('');
    color = '' + r + r + g + g + b + b + opacityHex;
    break;
  }
  case 4: {
    const [r, g, b, a] = color.split('');
    color = ''+r + r + g + g + b + b + a + a;
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
    stop(response, 400, 'Invalid hex code');
  }
  }

  return parseInt(color, 16);
}

export type ArrayOr<T> = Array<T> | T;
export type PromiseOr<T> = Promise<T> | T;

export async function createImageEditor<T extends string = string>(
  req: Input<T>,
  res: Output,
  callee: (
    editor: Array<Image>
  ) => PromiseOr<ArrayOr<Frame>> | PromiseOr<ArrayOr<Image>> | never
): Promise<void> {
  const url = req.query.get('url');

  if (url) {
    const payload = await fetch(
      url,
      Constants.HTTPVerbs.GET,
      'buffer'
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
    let contentType = 'image/png';
    switch (editor.length) {
    case 0: {
      return stop(res, 400, 'No frames found');
    }

    case 1: {
      const [image] = editor as [Frame | Image];
      u8 = await image.encode();
      break;
    }

    default: {
      contentType = 'image/gif';
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

    
    const sent = Buffer.from(u8);
    res.setHeader('content-type', contentType);

    res.send(sent);
    
  } else {
    stop(res, 400, 'No image URL provided');
  }
}

export async function createDualEditor<T extends string = string>(
  req: Input<T>,
  res: Output,
  callee: (
    source: Array<Image>,
    target: Array<Image>
  ) => PromiseOr<ArrayOr<Frame>> | PromiseOr<ArrayOr<Image>> | never
): Promise<undefined> {
  const source = req.query.get('source');
  const target = req.query.get('target');

  console.log('using', source, '\n', target);

  const o = [];

  if (source && target) {
    for (const url of [source, target]){
      const payload = await fetch(
        url,
        Constants.HTTPVerbs.GET,
        'buffer'
      );

      let editor: Awaited<ReturnType<typeof callee>> = await decodeImage(
        payload.unwrap(),
        false
      );

      if (!Array.isArray(editor)) {
        editor = [editor];
      }
      o.push(editor);
    }

    const [sourcePayload, targetPayload] = o as [Array<Image>, Array<Image>];

    

    let editor = await callee(sourcePayload, targetPayload.map(x=>x.resize(sourcePayload[0]?.width || 0, sourcePayload[0]?.height || 0)));

    if (!Array.isArray(editor)) {
      editor = [editor];
    }

    let u8: Uint8Array | null = null;
    let contentType = 'image/png';
    switch (editor.length) {
    case 0: {
      return stop(res, 400, 'No frames found');
    }

    case 1: {
      const [image] = editor as [Frame | Image];
      u8 = await image.encode();
      break;
    }

    default: {
      contentType = 'image/gif';
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

    const sent = Buffer.from(u8);
    res.setHeader('content-type', contentType);

    res.send(sent);
  } else {
    stop(res, 400, 'No image URLs provided (need two)');
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
): Promise<void> {
  const url = req.query.get('url');

  if (url) {
    const payload = await fetch(
      url,
      Constants.HTTPVerbs.GET,
      'buffer'
    );

    
    const int = path.resolve('./input', options.source + '.' + getUrlExtension(payload.uri().href));
    console.log('writing to', int);
    writeFileSync(int, payload.unwrap());
    
    const out = path.resolve('./output', options.destination);

    const args = [
      '-i',
      int,
      ...options.args.flat(1),
      '-y',
      out,
    ];

    console.log('ffmpeg', args.join(' '));
    
    try {
      execSync(`ffmpeg ${args.join(' ')}`);
    } catch {
      console.error('what!!');
      throw null;
    }

    res.setHeader('content-type', options.mimetype);
    res.setHeader(
      'content-disposition',
      `attachment; filename="${options.destination}"`
    );

    console.log('reading from ', out);
    res.send(readFileSync(out));
  } else {
    stop(res, 400, 'No media URL provided');
  }
}
type Data<T> = Payload<T>
export type Transformer =
  'arrayBuffer' | 'blob' | 'buffer' | 'json' | 'request' | 'text';
export async function fetch(
  uri: URL | string,
  method: Constants.HTTPVerbs,
  transformer: 'arrayBuffer',
  init?: import('@rqft/fetch').Constants.Options
): Promise<Data<ArrayBuffer>>;
export async function fetch<T>(
  uri: URL | string,
  method: Constants.HTTPVerbs,
  transformer: 'json',
  init?: import('@rqft/fetch').Constants.Options
): Promise<Data<T>>;
export async function fetch(
  uri: URL | string,
  method: Constants.HTTPVerbs,
  transformer: 'text',
  init?: import('@rqft/fetch').Constants.Options
): Promise<Data<string>>;
export async function fetch(
  uri: URL | string,
  method: Constants.HTTPVerbs,
  transformer: 'blob',
  init?: import('@rqft/fetch').Constants.Options
): Promise<Data<Blob>>;
export async function fetch(
  uri: URL | string,
  method: Constants.HTTPVerbs,
  transformer: 'buffer',
  init?: import('@rqft/fetch').Constants.Options
): Promise<Data<Buffer>>;
export async function fetch(
  uri: URL | string,
  method: Constants.HTTPVerbs,
  transformer: 'request',
  init?: import('@rqft/fetch').Constants.Options
): Promise<Data<Request>>;

export async function fetch(
  uri: URL | string,
  method: Constants.HTTPVerbs,
  transformer: Transformer = 'request',
  init?: import('@rqft/fetch').Constants.Options
): Promise<Data<ArrayBuffer> | Data<Blob> | Data<Buffer> | Data<Request> | Data<string> | Data<unknown>> {
  return new Requester(uri)[transformer as 'json'](`${method} ` as '/', {}, init);

}

export function sleep(ms: number): void {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
  return;
}

export function generateCanvas(actions: Array<Action>): Image {
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
): number {
  return ((v - xn) / (xm - xn)) * (ym - yn) + yn;
}

export class IdBasedKv<T> extends Wilson<Record<string, T>> {
  public readonly guildId: string;
  constructor(guildId: string) {
    super('kv/kv');
    this.guildId = guildId;
  }

  public read(): NonNullable<V<T>> {
    const w = new Wilson<Record<string, T>>('kv/kv');
    return (w.get(this.guildId) || {}) as never;
  }

  public write(data: Record<string, T>): this {
    return super.put(this.guildId, data[this.guildId] as T);
  }
}

export function getUrlExtension(url: string): string {
  return url.split(/[#?]/)[0]?.split('.').pop()?.trim() || '';
}



export function zip<T, U>(a: Array<T>, b: Array<U>): Array<readonly [T, U]> {
  const out = [];
  for (let i = 0; i < a.length; i++) {
    console.log('zipping', i);
    out.push([a[i] as never, b[i] as never] as const);
  }

  return out;
}
export function u8(int: number) {
  return Math.max(0, Math.min(int, 255)) | 0;
}