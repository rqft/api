import { Input, Output } from "@rqft/http";
import { KV } from "../../globals";
import { give } from "../../models/result";

export function kvRead(input: Input<"/kv/{guildId}/read">, output: Output) {
  return give(output, KV.kv.get(input.params.get("guildId")));
}

export function kvWrite(input: Input<"/kv/{guildId}/write">, output: Output) {
  const i = input.params.get("guildId");
  return give(output, KV.kv.put(i, JSON.parse(input.body)).get(i));
}
