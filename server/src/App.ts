import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca";
import mongo from "connect-mongo";
import flash from "express-flash";
import path from "path";
import mongoose from "mongoose";
import passport from "passport";
import bluebird from "bluebird";
import cors from "cors";
import {MONGODB_URI, SESSION_SECRET} from "./util/secrets";

const MongoStore = mongo(session);

// Router
import Router from "./Router";

// Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as userController from "./controllers/user";
import * as apiController from "./controllers/api";
import * as contactController from "./controllers/contact";


// API keys and Passport configuration
import * as passportConfig from "./config/passport";

class App {
    public httpServer: any;

    constructor() {
        const app = express();

        // Connect to MongoDB
        const mongoUrl = MONGODB_URI;
        mongoose.Promise = bluebird;

        mongoose.connect(mongoUrl, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then(
            () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
            }
        ).catch(err => {
            console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
            // process.exit();
        });

        // Express configuration
        app.set("port", process.env.PORT || 3000);

        app.use(compression());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(session({
            resave: true,
            saveUninitialized: true,
            secret: SESSION_SECRET,
            store: new MongoStore({
                url: mongoUrl,
                autoReconnect: true
            })
        }));

        app.use(passport.initialize());
        app.use(passport.session());
        app.use(flash());
        app.use(lusca.xframe("SAMEORIGIN"));
        app.use(lusca.xssProtection(true));
        app.use((req, res, next) => {
            res.locals.user = req.user;
            next();
        });
        app.use(cors());

        app.use(
            express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
        );

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

        new Router(app);

        this.httpServer = app;
    }

    start() {
        const app = this.httpServer;

        return app.listen(
            app.get("port"),
            () => {
                console.log(
                    "  App is running at http://localhost:%d in %s mode",
                    app.get("port"),
                    app.get("env")
                );
                console.log("  Press CTRL-C to stop\n");
            }
        );
    }
}

export {App};
