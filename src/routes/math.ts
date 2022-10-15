import { Input, Output } from "@rqft/http";
import { mathjs } from "../globals";
import { give, stop } from "../models/result";

export function math(i: Input<"/math">, o: Output) {
  console.log("on lh");
  let z: any | undefined;
  try {
    z = mathjs.evaluate(i.query.get("expr"));
  } catch (e) {
    stop(o, 500, (e as Error).message);
  }

  if (z === undefined) {
    give(o, 0);
  }

  give(o, z);
}
