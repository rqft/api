"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("./globals");
const audio_extract_1 = require("./routes/audio.extract");
const audio_pitch_1 = require("./routes/audio.pitch");
const audio_volume_1 = require("./routes/audio.volume");
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
globals_1.Sarah.use((req, res, next, endpoint, client) => {
    res.setHeader("content-type", "application/json");
    res.setStatus(200);
    next(req, res, next, endpoint, client);
});
globals_1.Sarah.create("GET /origin", origin_1.origin);
globals_1.Sarah.create("GET /endpoints", endpoints_1.endpoints);
globals_1.Sarah.create("GET /tags/list", tag_list_1.tagList);
globals_1.Sarah.create("GET /tags/inspect", tag_inspect_1.tagInspect);
globals_1.Sarah.create("GET /tags/{key}", tag_get_1.tagGet);
globals_1.Sarah.create("POST /tags/{key}", tag_post_1.tagPost);
globals_1.Sarah.create("DELETE /tags/{key}", tag_delete_1.tagDelete);
globals_1.Sarah.create("GET /tags/search/{query}", tag_search_1.tagSearch);
globals_1.Sarah.create("GET /image/average-color", image_averagecolor_1.imageAverageColor);
globals_1.Sarah.create("GET /image/brightness/{amount}", image_brightness_1.imageBrightness);
globals_1.Sarah.create("GET /image/color/{size}/{color}", image_color_1.imageColor);
globals_1.Sarah.create("GET /image/fisheye/{amount}", image_fisheye_1.imageFisheye);
globals_1.Sarah.create("GET /image/mirror", image_flop_1.imageFlop);
globals_1.Sarah.create("GET /image/invert/{method}", image_invert_1.imageInvert);
globals_1.Sarah.create("GET /image/resize/{size}", image_resize_1.imageResize);
globals_1.Sarah.create("GET /image/rotate/{deg}", image_rotate_1.imageRotate);
globals_1.Sarah.create("GET /image/saturation/{amount}", image_saturation_1.imageSaturation);
globals_1.Sarah.create("GET /image/spin", image_spin_1.imageSpin);
globals_1.Sarah.create("GET /image/tilt/{amount}", image_tilt_1.imageTilt);
globals_1.Sarah.create("GET /image/tint/{color}", image_tint_1.imageTint);
globals_1.Sarah.create("GET /audio/volume/{amount}", audio_volume_1.audioVolume);
globals_1.Sarah.create("GET /audio/pitch/{amount}", audio_pitch_1.audioPitch);
globals_1.Sarah.create("GET /audio/extract", audio_extract_1.audioExtract);
globals_1.Sarah.create("GET /text/convert/{conversion}/{method}", text_encode_1.textConvert);
globals_1.Sarah.create("GET /todos/{userId}", todo_list_1.todoList);
globals_1.Sarah.create("GET /todos/{userId}/{id}", todo_get_1.todoGet);
globals_1.Sarah.create("POST /todos/{userId}", todo_post_1.todoPost);
globals_1.Sarah.create("DELETE /todos/{userId}/{id}", todo_delete_1.todoDelete);
globals_1.Sarah.create("PUT /todos/{userId}/{id}", todo_put_1.todoPut);
globals_1.Sarah.create("GET /todos/search/{userId}/{query}", todo_search_1.todoSearch);
globals_1.Sarah.initialize();
globals_1.Sarah.listen(() => {
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
