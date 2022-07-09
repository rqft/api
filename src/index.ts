import { Sarah } from "./globals";
import { audioExtract } from "./routes/audio.extract";
import { audioPitch } from "./routes/audio.pitch";
import { audioVolume } from "./routes/audio.volume";

import { endpoints } from "./routes/endpoints";
import { imageAverageColor } from "./routes/image.averagecolor";
import { imageBrightness } from "./routes/image.brightness";
import { imageColor } from "./routes/image.color";
import { imageFisheye } from "./routes/image.fisheye";
import { imageFlop } from "./routes/image.flop";
import { imageInvert } from "./routes/image.invert";
import { imageResize } from "./routes/image.resize";
import { imageRotate } from "./routes/image.rotate";
import { imageSaturation } from "./routes/image.saturation";
import { imageSpin } from "./routes/image.spin";
import { imageTilt } from "./routes/image.tilt";
import { imageTint } from "./routes/image.tint";
import { origin } from "./routes/origin";
import { tagDelete } from "./routes/tag.delete";
import { tagGet } from "./routes/tag.get";
import { tagInspect } from "./routes/tag.inspect";
import { tagList } from "./routes/tag.list";
import { tagPost } from "./routes/tag.post";
import { tagSearch } from "./routes/tag.search";
import { textConvert } from "./routes/text.encode";
import { todoDelete } from "./routes/todo.delete";
import { todoGet } from "./routes/todo.get";
import { todoList } from "./routes/todo.list";
import { todoPost } from "./routes/todo.post";
import { todoPut } from "./routes/todo.put";
import { todoSearch } from "./routes/todo.search";

// middle ware
Sarah.use((req, res, next, endpoint, client) => {
  res.setHeader("content-type", "application/json");
  res.setStatus(200);
  next!(req, res, next!, endpoint, client);
});

// routes
Sarah.create("GET /origin", origin);
Sarah.create("GET /endpoints", endpoints);

// // tags
Sarah.create("GET /tags/list", tagList);
Sarah.create("GET /tags/inspect", tagInspect);
Sarah.create("GET /tags/{key}", tagGet);
Sarah.create("POST /tags/{key}", tagPost);
Sarah.create("DELETE /tags/{key}", tagDelete);
Sarah.create("GET /tags/search/{query}", tagSearch);

// // image manip
Sarah.create("GET /image/average-color", imageAverageColor);
Sarah.create("GET /image/brightness/{amount}", imageBrightness);
Sarah.create("GET /image/color/{size}/{color}", imageColor);
Sarah.create("GET /image/fisheye/{amount}", imageFisheye);
Sarah.create("GET /image/mirror", imageFlop);
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

// // todos
Sarah.create("GET /todos/{userId}", todoList);
Sarah.create("GET /todos/{userId}/{id}", todoGet);
Sarah.create("POST /todos/{userId}", todoPost);
Sarah.create("DELETE /todos/{userId}/{id}", todoDelete);
Sarah.create("PUT /todos/{userId}/{id}", todoPut);
Sarah.create("GET /todos/search/{userId}/{query}", todoSearch);

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
