"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const errorhandler_1 = __importDefault(require("errorhandler"));
const app = new App_1.App();
/**
 * Error Handler. Provides full stack - remove for production
 */
app.httpServer.use(errorhandler_1.default());
/**
 * Start Express server.
 */
const server = app.start();
exports.default = server;
//# sourceMappingURL=server.js.map