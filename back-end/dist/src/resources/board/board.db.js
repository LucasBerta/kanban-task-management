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
    static createBoard(_board) {
        return __awaiter(this, void 0, void 0, function* () {
            const board = new board_model_1.default(_board);
            return yield board.save();
        });
    }
}
exports.default = BoardDB;
