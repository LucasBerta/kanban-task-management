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
const board_model_1 = __importDefault(require("./board.model"));
class BoardDB {
    static getAllBoards() {
        return __awaiter(this, void 0, void 0, function* () {
            const boards = yield board_model_1.default.find();
            return boards;
        });
    }
    static getBoard(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield board_model_1.default.findOne(filter);
        });
    }
    static deleteBoard(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield board_model_1.default.findOneAndDelete({ _id: id });
        });
    }
    static createBoard(board) {
        return __awaiter(this, void 0, void 0, function* () {
            const _board = new board_model_1.default(board);
            return yield _board.save();
        });
    }
    static updateBoard(id, board) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const savedBoard = yield board_model_1.default.findOne({ _id: `${id}` });
            if (areEqual(savedBoard === null || savedBoard === void 0 ? void 0 : savedBoard.columns, board.columns)) {
                return yield (board_model_1.default === null || board_model_1.default === void 0 ? void 0 : board_model_1.default.findByIdAndUpdate(id, board, { new: true }));
            }
            const newBoard = Object.assign({}, board);
            newBoard.tasks = (_a = newBoard.tasks) === null || _a === void 0 ? void 0 : _a.map(task => (Object.assign(Object.assign({}, task), { status: getNewStatus(savedBoard === null || savedBoard === void 0 ? void 0 : savedBoard.columns, board.columns, task) || task.status })));
            return yield (board_model_1.default === null || board_model_1.default === void 0 ? void 0 : board_model_1.default.findByIdAndUpdate(id, newBoard, { new: true }));
        });
    }
}
exports.default = BoardDB;
//Validators and Hanlders
function getNewStatus(savedBoardColumns, newBoardColumns, task) {
    var _a;
    const statusIndex = savedBoardColumns === null || savedBoardColumns === void 0 ? void 0 : savedBoardColumns.findIndex(column => column.name === task.status);
    return (_a = newBoardColumns === null || newBoardColumns === void 0 ? void 0 : newBoardColumns.find((column, index) => index === statusIndex)) === null || _a === void 0 ? void 0 : _a.name;
}
function areEqual(oldArr, newArr) {
    if ((oldArr === null || oldArr === void 0 ? void 0 : oldArr.length) !== (newArr === null || newArr === void 0 ? void 0 : newArr.length))
        return false;
    return oldArr === null || oldArr === void 0 ? void 0 : oldArr.every(item => newArr === null || newArr === void 0 ? void 0 : newArr.includes(item));
}
