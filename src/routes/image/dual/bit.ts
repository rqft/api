
import { pixelOps } from './pixel-ops';

export const imageDualXor = pixelOps<'/image/dual/xor'>(
  ([r, g, b, a], [h, s, l, v]) => {
    return [r ^ h, g ^ s, b ^ l, (a + v) / 2];
  }
);

export const imageDualOr = pixelOps<'/image/dual/or'>(
  ([r, g, b, a], [h, s, l, v]) => {
    return [r | h, g | s, b | l, (a + v) / 2];
  }
);

export const imageDualAnd = pixelOps<'/image/dual/and'>(
  ([r, g, b, a], [h, s, l, v]) => {
    return [r & h, g & s, b & l, (a + v) / 2];
  }
);

export const imageDualAdd = pixelOps<'/image/dual/add'>(
  ([r, g, b, a], [h, s, l, v]) => {
    return [r + h, g + s, b + l, (a + v) / 2];
  }
);

export const imageDualSub = pixelOps<'/image/dual/sub'>(
  ([r, g, b, a], [h, s, l, v]) => {
    return [r - h, g - s, b - l, (a + v) / 2];
  }
);

export const imageDualMul = pixelOps<'/image/dual/mul'>(
  ([r, g, b, a], [h, s, l, v]) => {
    return [r * h, g * s, b * l, (a + v) / 2];
  }
);

export const imageDualDiv = pixelOps<'/image/dual/div'>(
  ([r, g, b, a], [h, s, l, v]) => {
    return [r / h, g / s, b / l, (a + v) / 2];
  }
);
