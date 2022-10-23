"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const images_1 = __importDefault(require("./routes/images"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.app.use((0, morgan_1.default)('dev'));
const port = process.env.PORT;
exports.app.get('/home', (req, res) => {
    res.send('Express + TypeScript Server');
});
exports.app.use('/', images_1.default);
exports.app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
