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
const board_model_1 = __importDefault(require("../board/board.model"));
const task_model_1 = require("./task.model");
class TaskDB {
    static deleteTask(boardId, taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const board = yield board_model_1.default.findOneAndUpdate({ _id: `${boardId}` }, { $pull: { tasks: { _id: taskId } } });
            return board;
        });
    }
    static updateTask(boardId, taskId, newTask) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const _newTask = new task_model_1.Task(newTask._id, newTask.title, newTask.description, newTask.status, newTask.subtasks);
            const board = yield board_model_1.default.findOneAndUpdate({ _id: `${boardId}`, 'tasks._id': `${taskId}` }, { $set: { 'tasks.$': _newTask } }, { new: true });
            return (_a = board === null || board === void 0 ? void 0 : board.tasks) === null || _a === void 0 ? void 0 : _a.find(task => `${task._id}` === taskId);
        });
    }
}
exports.default = TaskDB;
