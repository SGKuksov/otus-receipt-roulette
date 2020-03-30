"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_json_1 = __importDefault(require("../mock-data/users.json"));
class UserRouter {
    constructor() {
        this.router = express_1.default.Router();
        /**
         * @swagger
         *
         * definitions:
         *   NewUser:
         *     type: object
         *     required:
         *       - username
         *       - password
         *     properties:
         *       username:
         *         type: string
         *       password:
         *         type: string
         *         format: password
         *   User:
         *     allOf:
         *       - $ref: '#/definitions/NewUser'
         *       - required:
         *         - id
         *       - properties:
         *         id:
         *           type: integer
         *           format: int64
         */
        /**
         * @swagger
         * /users:
         *   get:
         *     description: Returns users
         *     produces:
         *      - application/json
         *     responses:
         *       200:
         *         description: users
         *         schema:
         *           type: array
         *           items:
         *             $ref: '#/definitions/User'
         */
        this.router.get("/", cors_1.default(), (req, res) => {
            res.json(users_json_1.default);
        });
        /**
         * @swagger
         *
         * /users:
         *   post:
         *     description: Creates a user
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: user
         *         description: User object
         *         in:  body
         *         required: true
         *         type: string
         *         schema:
         *           $ref: '#/definitions/NewUser'
         *     responses:
         *       200:
         *         description: users
         *         schema:
         *           $ref: '#/definitions/User'
         */
        this.router.post("/", cors_1.default(), (req, res) => {
            try {
                res.json({ status: 201 });
            }
            catch (e) {
                res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
            }
        });
        // get user by id
        this.router.get("/:id", cors_1.default(), (req, res) => {
            const key = parseInt(req.params.id, 10);
            if (!!users_json_1.default[key]) {
                res.json(users_json_1.default[key]);
            }
            else {
                res.status(404).send(JSON.stringify({ "error": "no such user" }));
            }
        });
        // update user
        this.router.put("/:id", cors_1.default(), (req, res) => {
            try {
                const key = parseInt(req.params.id, 10);
                if (!!users_json_1.default[key]) {
                    res.json({ status: 204 });
                }
                else {
                    res.status(404).send(JSON.stringify({ "error": "no such user" }));
                }
            }
            catch (e) {
                res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
            }
        });
        // delete user
        this.router.delete("/:id", cors_1.default(), (req, res) => {
            const key = parseInt(req.params.id, 10);
            if (!!users_json_1.default[key]) {
                res.json({ status: 200 });
            }
            else {
                res.status(404).send(JSON.stringify({ "error": "no such user" }));
            }
        });
    }
}
exports.default = UserRouter;
//# sourceMappingURL=UserRouter.js.map