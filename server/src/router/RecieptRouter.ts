import express, { Request, Response } from "express";
import cors from "cors";
import reciepts from "../mock-data/reciepts.json";

class RecieptRouter {
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.options("*", cors());

    // get all reciepts
    this.router.get("/", cors(), (req: Request, res: Response) => {
      res.json(reciepts);
    });

    // create post by id
    this.router.post("/", cors(), (req: Request, res: Response) => {
      try {
        res.json({ status: 201 });
      } catch (e) {
        res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
      }
    });

    // get post by id
    this.router.get("/:id", cors(), (req: Request, res: Response) => {
      const key = parseInt(req.params.id, 10);

      if (!!reciepts[key]) {
        res.json(reciepts[key]);
      } else {
        res.status(404).send(JSON.stringify({ "error": "no such post" }));
      }
    });

    // update post
    this.router.put("/:id", cors(), (req: Request, res: Response) => {
      try {
        const key = parseInt(req.params.id, 10);

        if (!!reciepts[key]) {
          res.json({ status: 204 });
        } else {
          res.status(404).send(JSON.stringify({ "error": "no such post" }));
        }
      } catch (e) {
        res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
      }
    });

    // delete post
    this.router.delete("/:id", cors(), (req: Request, res: Response) => {
      const key = parseInt(req.params.id, 10);

      if (!!reciepts[key]) {
        res.json({ status: 200 });
      } else {
        res.status(404).send(JSON.stringify({ "error": "no such post" }));
      }
    });
  }
}

export default RecieptRouter;
