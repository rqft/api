"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wombo = void 0;
const wombo_dream_api_1 = require("wombo-dream-api");
const result_1 = require("../models/result");
async function wombo(req, res) {
    const WomboStyles = {
        psychedelic: 21,
        surreal: 23,
        synthwave: 1,
        ghibli: 22,
        steampunk: 4,
        fantasy: 5,
        vibrant: 6,
        hd: 7,
        psychic: 9,
        darkfantasy: 10,
        mystical: 11,
        baroque: 13,
        etching: 14,
        sdali: 15,
        wuhtercuhler: 16,
        provenance: 17,
        moonwalker: 19,
        blacklight: 20,
        none: 3,
        ukiyoe: 2,
        rosegold: 18,
    };
    const style = (req.params.get('style') || 'none').toLowerCase();
    const query = req.params.get('query');
    if (!(style in WomboStyles)) {
        (0, result_1.stop)(res, 400, 'Invalid style');
    }
    if (!query) {
        (0, result_1.stop)(res, 400, 'No query provided');
    }
    console.log(style, query);
    await (0, wombo_dream_api_1.buildDefaultInstance)().generatePicture(query, WomboStyles[style], async (task) => {
        if (task.result) {
            if (task.result.final) {
                (0, result_1.give)(res, task.result.final);
            }
        }
    });
}
exports.wombo = wombo;
