"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stop = exports.ResultState = exports.give = void 0;
function give(res, data, status = {
    state: ResultState.OK,
    message: undefined,
    code: undefined,
}) {
    res.send({ data, status });
    throw null;
}
exports.give = give;
var ResultState;
(function (ResultState) {
    ResultState["OK"] = "ok";
    ResultState["ERROR"] = "error";
})(ResultState = exports.ResultState || (exports.ResultState = {}));
function stop(res, code, message) {
    res.setStatus(code);
    give(res, null, { state: ResultState.ERROR, message, code });
}
exports.stop = stop;
