import { auth } from "./auth";
import { NeedsNoAuth, Sarah } from "./globals";
import { authorized } from "./routes/authorized";
import { base64Decode } from "./routes/base64.decode";
import { base64Encode } from "./routes/base64.encode";
import { binaryDecode } from "./routes/binary.decode";
import { binaryEncode } from "./routes/binary.encode";
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
import { todoDelete } from "./routes/todo.delete";
import { todoGet } from "./routes/todo.get";
import { todoList } from "./routes/todo.list";
import { todoPost } from "./routes/todo.post";
import { todoPut } from "./routes/todo.put";
import { todoSearch } from "./routes/todo.search";
import { syncFromGit } from "./tools";

// middleware
Sarah.use((req, res, next) => {
  res.contentType("application/json");
  if (NeedsNoAuth.includes(req.path)) {
    next();
    return;
  }

  auth(req, res, next);
});

// routes
Sarah.get("/authorized", authorized);
Sarah.get("/origin", origin);
Sarah.get("/endpoints", endpoints);

// tools
Sarah.get("/base64/encode", base64Encode);
Sarah.get("/base64/decode", base64Decode);
Sarah.get("/binary/encode", binaryEncode);
Sarah.get("/binary/decode", binaryDecode);

// tags
Sarah.get("/tags/list", tagList);
Sarah.get("/tags/inspect", tagInspect);
Sarah.get("/tags/:key", tagGet);
Sarah.post("/tags/:key", tagPost);
Sarah.delete("/tags/:key", tagDelete);
Sarah.get("/tags/search/:query", tagSearch);

// image manip
Sarah.get("/image/average-color", imageAverageColor);
Sarah.get("/image/brightness/:amount", imageBrightness);
Sarah.get("/image/color/:size/:color", imageColor);
Sarah.get("/image/fisheye/:amount", imageFisheye);
Sarah.get("/image/mirror", imageFlop);
Sarah.get("/image/invert/:method", imageInvert);
Sarah.get("/image/resize/:size", imageResize);
Sarah.get("/image/rotate/:deg", imageRotate);
Sarah.get("/image/saturation/:amount", imageSaturation);
Sarah.get("/image/spin", imageSpin);
Sarah.get("/image/tilt/:amount", imageTilt);
Sarah.get("/image/tint/:color", imageTint);

// todos
Sarah.get("/todos/:userId", todoList);
Sarah.get("/todos/:userId/:id", todoGet);
Sarah.post("/todos/:userId", todoPost);
Sarah.delete("/todos/:userId/:id", todoDelete);
Sarah.put("/todos/:userId/:id", todoPut);
Sarah.get("/todos/search/:userId/:query", todoSearch);

Sarah.listen(3000, () => {
  // sync up the database
  syncFromGit("/colors.json");
  syncFromGit("/mutes.json");
  syncFromGit("/prefixes.json");
  syncFromGit("/tags.json");
  syncFromGit("/todo.json");

  console.log("ok started on api.clancy.lol");
});

process.on("unhandledRejection", (reason) => {
  if (reason === null) {
    return;
  }

  console.error(reason);
});
