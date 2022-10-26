
export function scale(
  v: number,
  [xn, xm]: [number, number],
  [yn, ym]: [number, number]
) {
  return ((v - xn) / (xm - xn)) * (ym - yn) + yn;
}
