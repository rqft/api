import { Input, Output } from "@rqft/http";
import { KV } from "../../globals";
import { give } from "../../models/result";

export function kvRead(input: Input<"/kv/{guildId}/read">, output: Output) {
  return give(output, KV.kv.get(input.params.get("guildId")));
}

export function kvWrite(input: Input<"/kv/{guildId}/write">, output: Output) {
  console.log("writing");
  const i = input.params.get("guildId");
  return give(output, KV.kv.put(i, JSON.parse(input.query.get("data"))).get(i));
}
