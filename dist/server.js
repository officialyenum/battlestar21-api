"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const routes = __importStar(require("./routes"));
const Logging_1 = __importDefault(require("./library/Logging"));
dotenv_1.default.config(); // load .env file
const app = (0, express_1.default)();
// Setup Mongoose
mongoose_1.default
    .connect(config_1.config.mongo.url, {
    retryWrites: true,
    w: 'majority'
})
    .then(() => {
    Logging_1.default.info('Connected to MongoDB');
    StartServer();
})
    .catch((err) => {
    Logging_1.default.error('Unable to connect to MongoDB');
    Logging_1.default.error(err);
});
const StartServer = () => {
    /** Register Routes */
    routes.register(app);
    const PORT = process.env.SERVER_PORT || 3000;
    app.listen(PORT, () => {
        // tslint:disable-next-line:no-console
        console.log(`Server started at http://localhost:${PORT}`);
    });
};
//# sourceMappingURL=server.js.map