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
const board_controller_1 = require("./board.controller");
const board = express_1.default.Router();
board.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boards = yield (0, board_controller_1.getAllBoards)();
        res.status(200).json(boards);
    }
    catch (e) {
        (0, common_1.sendErrorResponse)(res, e);
    }
}));
board.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, board_controller_1.deleteBoard)(req.params.id);
        res.status(204).send('Board deleted successfully!');
    }
    catch (e) {
        (0, common_1.sendErrorResponse)(res, e);
    }
}));
board.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        delete req.body._id;
        const board = req.body;
        const newBoard = yield (0, board_controller_1.createBoard)(board);
        res.status(201).json(newBoard);
    }
    catch (e) {
        (0, common_1.sendErrorResponse)(res, e);
    }
}));
exports.default = board;
