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
const sync_1 = require("./db/sync");
const errorHandleMiddleware_1 = require("./middlewares/errorHandleMiddleware");
const index_1 = require("./routes/index");
const db_1 = require("./db/db");
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
(0, dotenv_1.config)();
const port = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json({}));
app.use((0, cors_1.default)({}));
app.use((0, express_fileupload_1.default)());
app.use("/static", express_1.default.static(path_1.default.join(__dirname, "static")));
app.use("/api", index_1.approuter);
//last middleware
app.use(errorHandleMiddleware_1.errorHandlerMiddleware);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.dbConnect)();
        yield (0, sync_1.syncDB)();
        app.listen(port, () => {
            console.log("Server working on a port", port);
        });
    }
    catch (error) {
        console.log(error);
    }
});
start();
