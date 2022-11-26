"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const mongoose_1 = require("mongoose");
const task_model_1 = require("../task/task.model");
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
    tasks: [task_model_1.taskSchema],
});
const BoardModel = (0, mongoose_1.model)('boards', boardSchema);
exports.default = BoardModel;
