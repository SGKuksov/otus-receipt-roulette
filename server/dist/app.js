"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression")); // compresses requests
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const lusca_1 = __importDefault(require("lusca"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const express_flash_1 = __importDefault(require("express-flash"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const bluebird_1 = __importDefault(require("bluebird"));
const cors_1 = __importDefault(require("cors"));
const secrets_1 = require("./util/secrets");
const MongoStore = connect_mongo_1.default(express_session_1.default);
// Router
const Router_1 = __importDefault(require("./Router"));
class App {
    constructor() {
        const app = express_1.default();
        // Connect to MongoDB
        const mongoUrl = secrets_1.MONGODB_URI;
        mongoose_1.default.Promise = bluebird_1.default;
        mongoose_1.default.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(() => {
        }).catch(err => {
            console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
            // process.exit();
        });
        // Express configuration
        app.set("port", process.env.PORT || 3000);
        app.use(compression_1.default());
        app.use(body_parser_1.default.json());
        app.use(body_parser_1.default.urlencoded({ extended: true }));
        app.use(express_session_1.default({
            resave: true,
            saveUninitialized: true,
            secret: secrets_1.SESSION_SECRET,
            store: new MongoStore({
                url: mongoUrl,
                autoReconnect: true
            })
        }));
        app.use(passport_1.default.initialize());
        app.use(passport_1.default.session());
        app.use(express_flash_1.default());
        app.use(lusca_1.default.xframe("SAMEORIGIN"));
        app.use(lusca_1.default.xssProtection(true));
        app.use((req, res, next) => {
            res.locals.user = req.user;
            next();
        });
        app.use(cors_1.default());
        // TODO Remove me
        // app.use((req, res, next) => {
        //   // After successful login, redirect back to the intended page
        //   if (!req.user &&
        //     req.path !== "/login" &&
        //     req.path !== "/signup" &&
        //     !req.path.match(/^\/auth/) &&
        //     !req.path.match(/\./)) {
        //     req.session.returnTo = req.path;
        //   } else if (req.user &&
        //     req.path == "/account") {
        //     req.session.returnTo = req.path;
        //   }
        //   next();
        // });
        new Router_1.default(app);
        this.httpServer = app;
    }
    start() {
        const app = this.httpServer;
        return app.listen(app.get("port"), () => {
            console.log("  App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));
            console.log("  Press CTRL-C to stop\n");
        });
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map