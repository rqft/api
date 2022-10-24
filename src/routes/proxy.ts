// import { Input, Output } from "@rqft/http";
// import { HeadersInit } from "node-fetch";
// import { give, stop } from "../models/result";
// import { fetch } from "../tools";

// export function proxy(req: Input<"/proxy">, res: Output) {
//   const url = req.query.get("url");
//   if (!url) {
//     stop(res, 400, "url is required");
//   }

//   const r = fetch(url, req.method, "text", {
//     headers: req.headers.toJSON() as HeadersInit,
//     body: req.body,
//   });
//   give(res, r);
// }
