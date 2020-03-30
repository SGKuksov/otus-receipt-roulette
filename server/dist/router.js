"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRouter_1 = __importDefault(require("./router/UserRouter"));
const PostRouter_1 = __importDefault(require("./router/PostRouter"));
// Swagger
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
class Router {
    constructor(server) {
        const router = express_1.default.Router();
        server.use("/", router);
        router.use("/users", new UserRouter_1.default().router);
        router.use("/posts", new PostRouter_1.default().router);
        // Swagger config
        // Extended: https://swagger.io/specification/#infoObject
        const options = {
            swaggerDefinition: {
                info: {
                    title: "Example API",
                    version: "1.0.0",
                    description: "Example API Information"
                },
                host: "localhost:3000",
                basePath: "/"
            },
            apis: [
                "./router/*.js"
            ]
        };
        const spec = swagger_jsdoc_1.default(options);
        router.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(spec));
        router.get("/swagger-json", (req, res) => {
            res.json(spec);
        });
        // 404 route
        router.get("*", (req, res) => {
            res.status(404).send("404");
        });
    }
}
exports.default = Router;
//# sourceMappingURL=Router.js.map
