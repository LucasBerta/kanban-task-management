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
exports.createBoard = exports.getAllBoards = void 0;
const board_db_1 = __importDefault(require("./board.db"));
const validators_1 = require("./../../core/validators");
const common_1 = require("../../core/common");
function getAllBoards() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield board_db_1.default.getAllBoards();
    });
}
exports.getAllBoards = getAllBoards;
function createBoard(board) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((0, validators_1.isEmpty)(board.name)) {
            (0, common_1.throwNewError)(validators_1.errorNames.VALIDATION, 'Board name is required!');
        }
        if (isThereAnyEmptyColumn(board)) {
            (0, common_1.throwNewError)(validators_1.errorNames.VALIDATION, 'Column name is required!');
        }
        if (getDuplicatedColumns(board).length > 0) {
            const duplicatedColumns = getDuplicatedColumns(board);
            (0, common_1.throwNewError)(validators_1.errorNames.VALIDATION, `The column${duplicatedColumns.length > 1 ? 's' : ''} "${duplicatedColumns.join(', ')}" ${duplicatedColumns.length > 1 ? 'are' : 'is'} duplicated!`);
        }
        const boardFound = yield getDuplicatedBoard(board);
        if (!!boardFound) {
            (0, common_1.throwNewError)(validators_1.errorNames.VALIDATION, `There is already a board with the name "${boardFound.name}". Please choose a different one!`);
        }
        return yield board_db_1.default.createBoard(board);
    });
}
exports.createBoard = createBoard;
// Local validators
function isThereAnyEmptyColumn(board) {
    var _a;
    return !!((_a = board.columns) === null || _a === void 0 ? void 0 : _a.find(column => (0, validators_1.isEmpty)(column.name)));
}
function getDuplicatedColumns(board) {
    var _a;
    return (0, validators_1.getDuplicatedRecords)((_a = board.columns) === null || _a === void 0 ? void 0 : _a.map(column => column.name));
}
function getDuplicatedBoard(board) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield board_db_1.default.getBoard({
            name: { $regex: new RegExp(`${board.name}`, 'gi') },
        });
    });
}
