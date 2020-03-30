"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const posts_json_1 = __importDefault(require("../mock-data/posts.json"));
class PostRouter {
    constructor() {
        this.router = express_1.default.Router();
        this.router.options("*", cors_1.default());
        // get all posts
        this.router.get("/", cors_1.default(), (req, res) => {
            res.json(posts_json_1.default);
        });
        // create post by id
        this.router.post("/", cors_1.default(), (req, res) => {
            try {
                res.json({ status: 201 });
            }
            catch (e) {
                res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
            }
        });
        // get post by id
        this.router.get("/:id", cors_1.default(), (req, res) => {
            const key = parseInt(req.params.id, 10);
            if (!!posts_json_1.default[key]) {
                res.json(posts_json_1.default[key]);
            }
            else {
                res.status(404).send(JSON.stringify({ "error": "no such post" }));
            }
        });
        // update post
        this.router.put("/:id", cors_1.default(), (req, res) => {
            try {
                const key = parseInt(req.params.id, 10);
                if (!!posts_json_1.default[key]) {
                    res.json({ status: 204 });
                }
                else {
                    res.status(404).send(JSON.stringify({ "error": "no such post" }));
                }
            }
            catch (e) {
                res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
            }
        });
        // delete post
        this.router.delete("/:id", cors_1.default(), (req, res) => {
            const key = parseInt(req.params.id, 10);
            if (!!posts_json_1.default[key]) {
                res.json({ status: 200 });
            }
            else {
                res.status(404).send(JSON.stringify({ "error": "no such post" }));
            }
        });
    }
}
exports.default = PostRouter;
//# sourceMappingURL=PostRouter.js.map