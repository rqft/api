export type Canvas = Array<Array<number>>;

export enum RawPixelColors {
  WHITE = 0xffffffff,
  BLACK = 0x000000ff,

  RED = 0xff0000ff,
  GREEN = 0x00ff00ff,
  BLUE = 0x0000ffff,

  YELLOW = 0xffff00ff,
  CYAN = 0x00ffffff,
  MAGENTA = 0xff00ffff,
}

export enum PixelColors {
  WHITE = 0b111,
  BLACK = 0b000,

  RED = 0b100,
  GREEN = 0b010,
  BLUE = 0b001,

  CYAN = 0b011,
  MAGENTA = 0b101,
  YELLOW = 0b110,
}

export const ExpandPixel: Record<PixelColors, RawPixelColors> = {
  [PixelColors.WHITE]: RawPixelColors.WHITE,
  [PixelColors.BLACK]: RawPixelColors.BLACK,

  [PixelColors.RED]: RawPixelColors.RED,
  [PixelColors.GREEN]: RawPixelColors.GREEN,
  [PixelColors.BLUE]: RawPixelColors.BLUE,

  [PixelColors.CYAN]: RawPixelColors.CYAN,
  [PixelColors.MAGENTA]: RawPixelColors.MAGENTA,
  [PixelColors.YELLOW]: RawPixelColors.YELLOW,
};

export type Action = [x: number, y: number, color: PixelColors];

export type Rgb = [number,number,number];
export type Rgba = [number,number,number,number]

