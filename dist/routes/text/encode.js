"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.caesar = exports.Encoders = exports.Conversion = exports.ConversionMethods = exports.textConvert = void 0;
const result_1 = require("../../models/result");
function textConvert(req, res) {
    const conversion = req.params.get('conversion');
    const method = req.params.get('method');
    const data = req.query.get('data');
    if (!data) {
        (0, result_1.stop)(res, 400, 'No data provided');
    }
    const result = exports.Encoders[conversion][method](data, req.query.toJSON());
    return (0, result_1.give)(res, result);
}
exports.textConvert = textConvert;
var ConversionMethods;
(function (ConversionMethods) {
    ConversionMethods["ENCODE"] = "encode";
    ConversionMethods["DECODE"] = "decode";
})(ConversionMethods = exports.ConversionMethods || (exports.ConversionMethods = {}));
var Conversion;
(function (Conversion) {
    Conversion["BASE64"] = "base64";
    Conversion["BINARY"] = "binary";
    Conversion["HEX"] = "hex";
    Conversion["CAESAR"] = "caesar";
})(Conversion = exports.Conversion || (exports.Conversion = {}));
exports.Encoders = {
    [Conversion.BASE64]: {
        [ConversionMethods.ENCODE]: (data) => Buffer.from(data).toString('base64'),
        [ConversionMethods.DECODE]: (data) => Buffer.from(data, 'base64').toString(),
    },
    [Conversion.BINARY]: {
        [ConversionMethods.ENCODE]: (data) => data
            .split('')
            .map((c) => c.charCodeAt(0).toString(2))
            .join(' '),
        [ConversionMethods.DECODE]: (data) => data
            .split(' ')
            .map((c) => String.fromCharCode(parseInt(c, 2)))
            .join(''),
    },
    [Conversion.HEX]: {
        [ConversionMethods.ENCODE]: (data) => Buffer.from(data).toString('hex'),
        [ConversionMethods.DECODE]: (data) => Buffer.from(data, 'hex').toString(),
    },
    [Conversion.CAESAR]: {
        [ConversionMethods.ENCODE]: (data, options) => caesar(data, ConversionMethods.ENCODE, options.shift),
        [ConversionMethods.DECODE]: (data, options) => caesar(data, ConversionMethods.DECODE, options.shift),
    },
};
function caesar(data, method, options) {
    const shift = options.shift;
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    return data
        .split('')
        .map((c) => {
        const index = alphabet.indexOf(c.toLowerCase());
        if (index === -1) {
            return c;
        }
        const newIndex = (index + shift * (method === ConversionMethods.DECODE ? -1 : 1)) %
            alphabet.length;
        return alphabet[newIndex].toUpperCase();
    })
        .join('');
}
exports.caesar = caesar;
