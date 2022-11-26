"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const mongoose_1 = require("mongoose");
class Board {
    constructor(id, name, columns) {
        this.id = id;
        this.name = name;
        this.columns = columns;
    }
}
exports.Board = Board;
const boardSchema = new mongoose_1.Schema({
    name: String,
    columns: (Array),
});
const BoardModel = (0, mongoose_1.model)('boards', boardSchema);
exports.default = BoardModel;
