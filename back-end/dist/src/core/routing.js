"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const board_routing_1 = __importDefault(require("../resources/board/board.routing"));
const task_routing_1 = __importDefault(require("../resources/task/task.routing"));
const appSetup_1 = __importDefault(require("./appSetup"));
dotenv_1.default.config();
const port = process.env.PORT;
const allowedOrigins = process.env.CORS_ORIGIN;
const corsOptions = {
    origin: allowedOrigins,
};
function setUpRoutes() {
    appSetup_1.default.use(body_parser_1.default.json());
    appSetup_1.default.use((0, cors_1.default)(corsOptions));
    appSetup_1.default.use('/boards', board_routing_1.default);
    appSetup_1.default.use('', task_routing_1.default);
    appSetup_1.default.listen(port, () => {
        console.log(`Server is running at port ${port}`);
    });
}
exports.default = setUpRoutes;
