import { App } from "./App";
import errorHandler from "errorhandler";

const app = new App();

/**
 * Error Handler. Provides full stack - remove for production
 */
app.httpServer.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.start();

export default server;
