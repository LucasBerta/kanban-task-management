"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.deleteTask = void 0;
const common_1 = require("../../core/common");
const validators_1 = require("../../core/validators");
const task_db_1 = __importDefault(require("./task.db"));
function deleteTask(boardId, taskId) {
    return __awaiter(this, void 0, void 0, function* () {
        const board = yield task_db_1.default.deleteTask(boardId, taskId);
        if (!board)
            (0, common_1.throwNewError)(validators_1.errorNames.DATA_NOT_FOUND, 'The board you are trying to modify does not exist.');
        return board;
    });
}
exports.deleteTask = deleteTask;
function updateTask(boardId, taskId, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const board = yield task_db_1.default.updateTask(boardId, taskId, payload);
        if (!board)
            (0, common_1.throwNewError)(validators_1.errorNames.INTERNAL_ERROR);
        return board;
    });
}
exports.updateTask = updateTask;
