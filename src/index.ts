import { Frame, GIF } from "imagescript";
import { Sarah } from "./globals";
import { audioExtract } from "./routes/audio/extract";
import { audioPitch } from "./routes/audio/pitch";
import { audioVolume } from "./routes/audio/volume";

import { endpoints } from "./routes/endpoints";
import { graph } from "./routes/graph";
import { imageAverageColor } from "./routes/image/averagecolor";
import { imageBrightness } from "./routes/image/brightness";
import { imageColor } from "./routes/image/color";
import { imageFisheye } from "./routes/image/fisheye";
import { imageMirror } from "./routes/image/flop";
import { imageInvert } from "./routes/image/invert";
import { imageResize } from "./routes/image/resize";
import { imageRotate } from "./routes/image/rotate";
import { imageSaturation } from "./routes/image/saturation";
import { imageSpin } from "./routes/image/spin";
import { imageTilt } from "./routes/image/tilt";
import { imageTint } from "./routes/image/tint";
import { kvRead, kvWrite } from "./routes/kv/get";
import { math } from "./routes/math";
import { origin } from "./routes/origin";
import { pixelInspect } from "./routes/pixel/inspect";
import { pixelTimelapse } from "./routes/pixel/timelapse";
import { tagDelete } from "./routes/tag/delete";
import { tagGet } from "./routes/tag/get";
import { tagInspect } from "./routes/tag/inspect";
import { tagList } from "./routes/tag/list";
import { tagPost } from "./routes/tag/post";
import { tagSearch } from "./routes/tag/search";
import { textEmojify } from "./routes/text/emojify";
import { textConvert } from "./routes/text/encode";
import { todoDelete } from "./routes/todo/delete";
import { todoGet } from "./routes/todo/get";
import { todoList } from "./routes/todo/list";
import { todoPost } from "./routes/todo/post";
import { todoPut } from "./routes/todo/put";
import { todoSearch } from "./routes/todo/search";

import { wombo } from "./routes/wombo";

// middle ware
Sarah.use((_, res, next) => {
  // if (_.url.pathname === "/favicon.ico") {
  //   // res.setStatus(404).send("Not found");
  //   return;
  // }
  res.setHeader("content-type", "application/json");
  res.setStatus(200);
  next();
});

// wombo
Sarah.create("GET /wombo/{style}/{query}", wombo);

// routes
Sarah.create("GET /origin", origin);
Sarah.create("GET /endpoints", endpoints);

// // tags
Sarah.create("GET /tags/list", tagList);
Sarah.create("GET /tags/inspect", tagInspect);
Sarah.create("GET /tags/get/{key}", tagGet);
Sarah.create("GET /tags/post/{key}", tagPost);
Sarah.create("GET /tags/delete/{key}", tagDelete);
Sarah.create("GET /tags/search/{query}", tagSearch);

// // image manip
Sarah.create("GET /image/average-color", imageAverageColor);
Sarah.create("GET /image/brightness/{amount}", imageBrightness);
Sarah.create("GET /image/color/{size}/{color}", imageColor);
Sarah.create("GET /image/fisheye/{amount}", imageFisheye);
Sarah.create("GET /image/mirror", imageMirror);
Sarah.create("GET /image/invert/{method}", imageInvert);
Sarah.create("GET /image/resize/{size}", imageResize);
Sarah.create("GET /image/rotate/{deg}", imageRotate);
Sarah.create("GET /image/saturation/{amount}", imageSaturation);
Sarah.create("GET /image/spin", imageSpin);
Sarah.create("GET /image/tilt/{amount}", imageTilt);
Sarah.create("GET /image/tint/{color}", imageTint);

// // audio manip
Sarah.create("GET /audio/volume/{amount}", audioVolume);
Sarah.create("GET /audio/pitch/{amount}", audioPitch);
Sarah.create("GET /audio/extract", audioExtract);

// // text manip
Sarah.create("GET /text/convert/{conversion}/{method}", textConvert);
Sarah.create("GET /text/emojify", textEmojify);

// // todos
Sarah.create("GET /todos/list/{userId}", todoList);
Sarah.create("GET /todos/get/{userId}/{id}", todoGet);
Sarah.create("GET /todos/post/{userId}", todoPost);
Sarah.create("GET /todos/delete/{userId}/{id}", todoDelete);
Sarah.create("PUT /todos/put/{userId}/{id}", todoPut);
Sarah.create("GET /todos/search/{userId}/{query}", todoSearch);

// // pixel canvas
Sarah.create("GET /pixel/inspect", pixelInspect);
Sarah.create("GET /pixel/timelapse/{frame}", pixelTimelapse);

Sarah.create("GET /graph", graph);
Sarah.create("GET /math", math);

Sarah.create("GET /kv/r/{guildId}", kvRead);
Sarah.create("GET /kv/w/{guildId}", kvWrite);

Sarah.create("GET /generate/gif/{frames}", async (q, s) => {
  const f = new Frame(1, 1).fill(0xffffffff);
  const frames = Array(Number(q.params.get("frames"))).fill(f);
  const gif = new GIF(frames);
  const u8 = await gif.encode();

  s.setHeader("content-type", "image/gif");

  s.send(u8);
});

Sarah.initialize();

Sarah.listen(() => {
  console.log("ok started on api.clancy.lol");
});

process.on("unhandledRejection", (reason) => {
  if (reason === null) {
    return;
  }

  console.error(reason);
});

process.on("uncaughtException", (reason) => {
  if (reason === null) {
    return;
  }

  console.error(reason);
});
