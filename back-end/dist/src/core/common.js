"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorResponse = exports.throwNewError = void 0;
const validators_1 = require("./validators");
function throwNewError(name, message) {
    const newError = new Error(message);
    newError.name = name;
    throw newError;
}
exports.throwNewError = throwNewError;
function sendErrorResponse(res, error) {
    if ((error === null || error === void 0 ? void 0 : error.name) === validators_1.errorNames.VALIDATION) {
        res.status(400).send(error.message);
        return;
    }
    if ((error === null || error === void 0 ? void 0 : error.name) === validators_1.errorNames.DATA_NOT_FOUND) {
        res.status(404).send(error.message);
        return;
    }
    if ((error === null || error === void 0 ? void 0 : error.name) === validators_1.errorNames.INTERNAL_ERROR) {
        res.status(500).send(error.message || 'Internal server error');
        return;
    }
    res.status(500).send(error.message);
}
exports.sendErrorResponse = sendErrorResponse;
