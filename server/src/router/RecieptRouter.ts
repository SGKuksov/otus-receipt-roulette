import express, {Request, Response} from "express";
import cors from "cors";
import RecieptController from "../controllers/RecieptController";
import multer from 'multer';

class RecieptRouter {
  router: express.Router;
  private recieptController: RecieptController;
  private upload: any;

  constructor() {
    this.router = express.Router();
    this.router.options("*", cors());
    this.recieptController = new RecieptController();
    this.upload = multer({dest: 'uploads/'});

    // get all reciepts
    this.router.get("/", cors(), async (req: Request, res: Response) => {
      try {
        const reciepts = await this.recieptController.getRecieptList();

        res.json(reciepts);
      } catch (e) {
        res.send(e);
      }
    });

    // create post by id
    this.router.post("/", cors(), async (req: Request, res: Response) => {
      try {
        await this.recieptController.createReciept(req.body);

        res.json({status: 201});
      } catch (e) {
        res.status(400).send(JSON.stringify({"error": "problem with posted data"}));
      }
    });

    // get post by id
    this.router.get("/:id", cors(), async (req: Request, res: Response) => {
      try {
        const {params: {id}} = req;
        const validation = await this.recieptController.checkExist(id);

        if (validation.isValid) {
          const reciept = await this.recieptController.getReciept(id);

          res.json(reciept);
        } else {
          res.status(404).json({"error": validation.error});
        }
      } catch (e) {

        console.log(e)
        res.send(e);
      }
    });

    // update post
    this.router.put("/:id", cors(), async (req: Request, res: Response) => {
      try {
        const {params: {id}} = req;
        const validation = await this.recieptController.checkExist(id);

        if (validation.isValid) {
          await this.recieptController.updateReciept(id, req.body);

          res.json({status: 204});
        } else {
          res.status(404).json({"error": validation.error});
        }
      } catch (e) {
        res.status(400).send(JSON.stringify({"error": "problem with posted data"}));
      }
    });

    // delete post
    this.router.delete("/:id", cors(), async (req: Request, res: Response) => {
      const {params: {id}} = req;
      const validation = await this.recieptController.checkExist(id);

      if (validation.isValid) {
        await this.recieptController.deleteReciept(id);

        res.json({status: 200});
      } else {
        res.status(404).json({"error": validation.error});
      }
    });
  }
}

export default RecieptRouter;
