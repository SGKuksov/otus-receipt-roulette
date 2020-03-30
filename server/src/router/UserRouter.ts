import express, { Request, Response } from "express";
import cors from "cors";
import users from "../mock-data/users.json";

class UserRouter {
  router: express.Router;

  constructor() {
    this.router = express.Router();

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
    this.router.get("/", cors(), (req: Request, res: Response) => {
      res.json(users);
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
    this.router.post("/", cors(), (req: Request, res: Response) => {
      try {
        res.json({ status: 201 });
      } catch (e) {
        res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
      }
    });

    // get user by id
    this.router.get("/:id", cors(), (req: Request, res: Response) => {
      const key = parseInt(req.params.id, 10);

      if (!!users[key]) {
        res.json(users[key]);
      } else {
        res.status(404).send(JSON.stringify({ "error": "no such user" }));
      }
    });

    // update user
    this.router.put("/:id", cors(), (req: Request, res: Response) => {
      try {
        const key = parseInt(req.params.id, 10);

        if (!!users[key]) {
          res.json({ status: 204 });
        } else {
          res.status(404).send(JSON.stringify({ "error": "no such user" }));
        }
      } catch (e) {
        res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
      }
    });

    // delete user
    this.router.delete("/:id", cors(), (req: Request, res: Response) => {
      const key = parseInt(req.params.id, 10);

      if (!!users[key]) {
        res.json({ status: 200 });
      } else {
        res.status(404).send(JSON.stringify({ "error": "no such user" }));
      }
    });
  }
}

export default UserRouter;
