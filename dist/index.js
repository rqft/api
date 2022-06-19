"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./auth");
const globals_1 = require("./globals");
const audio_extract_1 = require("./routes/audio.extract");
const audio_pitch_1 = require("./routes/audio.pitch");
const audio_volume_1 = require("./routes/audio.volume");
const authorized_1 = require("./routes/authorized");
const endpoints_1 = require("./routes/endpoints");
const image_averagecolor_1 = require("./routes/image.averagecolor");
const image_brightness_1 = require("./routes/image.brightness");
const image_color_1 = require("./routes/image.color");
const image_fisheye_1 = require("./routes/image.fisheye");
const image_flop_1 = require("./routes/image.flop");
const image_invert_1 = require("./routes/image.invert");
const image_resize_1 = require("./routes/image.resize");
const image_rotate_1 = require("./routes/image.rotate");
const image_saturation_1 = require("./routes/image.saturation");
const image_spin_1 = require("./routes/image.spin");
const image_tilt_1 = require("./routes/image.tilt");
const image_tint_1 = require("./routes/image.tint");
const origin_1 = require("./routes/origin");
const tag_delete_1 = require("./routes/tag.delete");
const tag_get_1 = require("./routes/tag.get");
const tag_inspect_1 = require("./routes/tag.inspect");
const tag_list_1 = require("./routes/tag.list");
const tag_post_1 = require("./routes/tag.post");
const tag_search_1 = require("./routes/tag.search");
const text_encode_1 = require("./routes/text.encode");
const todo_delete_1 = require("./routes/todo.delete");
const todo_get_1 = require("./routes/todo.get");
const todo_list_1 = require("./routes/todo.list");
const todo_post_1 = require("./routes/todo.post");
const todo_put_1 = require("./routes/todo.put");
const todo_search_1 = require("./routes/todo.search");
globals_1.Sarah.use((req, res, next) => {
    res.contentType("application/json");
    if (globals_1.NeedsNoAuth.includes(req.path)) {
        next();
        return;
    }
    (0, auth_1.auth)(req, res, next);
});
globals_1.Sarah.get("/authorized", authorized_1.authorized);
globals_1.Sarah.get("/origin", origin_1.origin);
globals_1.Sarah.get("/endpoints", endpoints_1.endpoints);
globals_1.Sarah.get("/tags/list", tag_list_1.tagList);
globals_1.Sarah.get("/tags/inspect", tag_inspect_1.tagInspect);
globals_1.Sarah.get("/tags/:key", tag_get_1.tagGet);
globals_1.Sarah.post("/tags/:key", tag_post_1.tagPost);
globals_1.Sarah.delete("/tags/:key", tag_delete_1.tagDelete);
globals_1.Sarah.get("/tags/search/:query", tag_search_1.tagSearch);
globals_1.Sarah.get("/image/average-color", image_averagecolor_1.imageAverageColor);
globals_1.Sarah.get("/image/brightness/:amount", image_brightness_1.imageBrightness);
globals_1.Sarah.get("/image/color/:size/:color", image_color_1.imageColor);
globals_1.Sarah.get("/image/fisheye/:amount", image_fisheye_1.imageFisheye);
globals_1.Sarah.get("/image/mirror", image_flop_1.imageFlop);
globals_1.Sarah.get("/image/invert/:method", image_invert_1.imageInvert);
globals_1.Sarah.get("/image/resize/:size", image_resize_1.imageResize);
globals_1.Sarah.get("/image/rotate/:deg", image_rotate_1.imageRotate);
globals_1.Sarah.get("/image/saturation/:amount", image_saturation_1.imageSaturation);
globals_1.Sarah.get("/image/spin", image_spin_1.imageSpin);
globals_1.Sarah.get("/image/tilt/:amount", image_tilt_1.imageTilt);
globals_1.Sarah.get("/image/tint/:color", image_tint_1.imageTint);
globals_1.Sarah.get("/audio/volume/:amount", audio_volume_1.audioVolume);
globals_1.Sarah.get("/audio/pitch/:amount", audio_pitch_1.audioPitch);
globals_1.Sarah.get("/audio/extract", audio_extract_1.audioExtract);
globals_1.Sarah.get("/text/convert/:conversion/:method", text_encode_1.textConvert);
globals_1.Sarah.get("/todos/:userId", todo_list_1.todoList);
globals_1.Sarah.get("/todos/:userId/:id", todo_get_1.todoGet);
globals_1.Sarah.post("/todos/:userId", todo_post_1.todoPost);
globals_1.Sarah.delete("/todos/:userId/:id", todo_delete_1.todoDelete);
globals_1.Sarah.put("/todos/:userId/:id", todo_put_1.todoPut);
globals_1.Sarah.get("/todos/search/:userId/:query", todo_search_1.todoSearch);
globals_1.Sarah.listen(3000, () => {
    console.log("ok started on api.clancy.lol");
});
process.on("unhandledRejection", (reason) => {
    if (reason === null) {
        return;
    }
    console.error(reason);
});
