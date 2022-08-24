import { Input, Output } from "@rqft/http";
import { Image } from "imagescript/ImageScript";
import { mathjs } from "../globals";
import { stop } from "../models/result";
import { scale } from "../tools";

const colors = [
  0x000000ff, 0xff0000ff, 0x00ff00ff, 0x0000ffff, 0xffff00ff, 0xff00ffff,
  0x00ffffff,
];

export async function graph(i: Input<"/graph">, o: Output) {
  console.log("test");
  const e = i.query.get("expr");
  if (!e) {
    stop(o, 400, "no expressions");
  }

  const s = Number.parseInt(i.query.get("size") || "1024");

  if (Number.isNaN(s)) {
    stop(o, 400, "invalid size");
  }

  const splot = Number.parseInt(i.query.get("splot") || "1");

  if (Number.isNaN(splot) || splot < 1) {
    stop(o, 400, "invalid splot area");
  }

  const scalar = Number.parseInt(i.query.get("scale") || "1");

  if (Number.isNaN(scalar)) {
    stop(o, 400, "invalid scalar");
  }

  const l = new Image(s, s);
  const [h, w] = [l.height / 2, l.width / 2];
  l.fill(0xffffffff);
  function set(x: number, y: number, c: number) {
    for (let i = -splot; i <= splot; i++) {
      for (let j = -splot; j <= splot; j++) {
        const z = scale(x, [-w, w], [1, l.width]) + i;
        const d = l.height - scale(y, [-h, h], [1, l.height]) + 1 + j;

        if (z > l.width || z < 1 || d > l.height || d < 1) {
          continue;
        }

        l.setPixelAt(z, d, c);
      }
    }
  }

  for (let i = 1; i < l.width; i++) {
    l.setPixelAt(l.width / 2, i, 0x888888ff);
    l.setPixelAt(i, l.width / 2, 0x888888ff);
  }

  for (let x = -w; x < w; x++) {
    const z = e.split(";");
    if (z.length > colors.length) {
      stop(o, 400, `too many expressions (max ${colors.length})`);
    }

    for (let dx = 0; dx < z.length; dx++) {
      const dy = z[dx];
      const c = colors[dx];
      if (dy === undefined || c === undefined) {
        continue;
      }

      const y = mathjs.evaluate(dy, { x: x / scalar }) * scalar;

      if (y > h || y < -h) {
        continue;
      }

      set(x, y, c);
    }
  }

  if (l.width < 1024) {
    l.resize(1024, 1024, Image.RESIZE_NEAREST_NEIGHBOR);
  }

  console.log("finished");

  o.setHeader("content-type", "image/png");
  o.send(await l.encode());
}
