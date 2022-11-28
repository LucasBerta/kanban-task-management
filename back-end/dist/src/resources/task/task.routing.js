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
const express_1 = __importDefault(require("express"));
const common_1 = require("../../core/common");
const task_controller_1 = require("./task.controller");
const task = express_1.default.Router();
const baseUrl = '/boards/:boardId/tasks';
task.delete(baseUrl + '/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const board = yield (0, task_controller_1.deleteTask)(req.params.boardId, req.params.id);
        res.send(board);
    }
    catch (e) {
        (0, common_1.sendErrorResponse)(res, e);
    }
}));
task.post(baseUrl, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const board = yield (0, task_controller_1.createTask)(req.params.boardId, req.body);
        res.send(board);
    }
    catch (e) {
        (0, common_1.sendErrorResponse)(res, e);
    }
}));
task.put(baseUrl + '/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const board = yield (0, task_controller_1.updateTask)(req.params.boardId, req.params.id, req.body);
        res.send(board);
    }
    catch (e) {
        (0, common_1.sendErrorResponse)(res, e);
    }
}));
exports.default = task;
