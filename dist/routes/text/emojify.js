"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textEmojify = void 0;
const result_1 = require("../../models/result");
function textEmojify(req, res) {
    const data = req.query.get('data');
    if (!data) {
        (0, result_1.stop)(res, 400, 'No data provided');
    }
    const result = emojify(data);
    return (0, result_1.give)(res, result);
}
exports.textEmojify = textEmojify;
const emoji = {
    '100': '💯',
    '0': '0️⃣',
    zero: '0️⃣',
    '1': '1️⃣',
    one: '1️⃣',
    '2': '2️⃣',
    two: '2️⃣',
    '3': '3️⃣',
    three: '3️⃣',
    '4': '4️⃣',
    four: '4️⃣',
    '5': '5️⃣',
    five: '5️⃣',
    '6': '6️⃣',
    six: '6️⃣',
    '7': '7️⃣',
    seven: '7️⃣',
    '8': '8️⃣',
    eight: '8️⃣',
    '9': '9️⃣',
    nine: '9️⃣',
    free: '🆓',
    cool: '🆒',
    abcd: '🔡',
    abc: '🔤',
    new: '🆕',
    sos: '🆘',
    cl: '🆑',
    ok: '🆗',
    id: '🆔',
    wc: '🚾',
    up: '🆙',
    ab: '🆎',
    '!!': '‼️',
    '!?': '⁉️',
    '!': '❗',
    '?': '❓',
    '#': '#️⃣',
    '*': '*️⃣',
    '+': '➕',
    '-': '➖',
    '/': '➗',
    '÷': '➗',
    $: '💲',
    '.': '⏹️',
    ' ': '⬛',
    '>': '▶️',
    '<': '◀️',
    '^': '🔼',
    a: '🇦',
    b: '🇧',
    c: '🇨',
    d: '🇩',
    e: '🇪',
    f: '🇫',
    g: '🇬',
    h: '🇭',
    i: '🇮',
    j: '🇯',
    k: '🇰',
    l: '🇱',
    m: '🇲',
    n: '🇳',
    o: '🇴',
    p: '🇵',
    q: '🇶',
    r: '🇷',
    s: '🇸',
    t: '🇹',
    u: '🇺',
    v: '🇻',
    w: '🇼',
    x: '🇽',
    y: '🇾',
    z: '🇿',
};
function emojify(data) {
    if (data.length === 0) {
        return '';
    }
    data = data.toLowerCase();
    for (const [k, v] of Object.entries(emoji)) {
        data = data.split(k).join('\u200b' + v);
    }
    return data;
}
