import express, { Request, Response } from "express";
import cors from "cors";
import UserRouter from "./router/UserRouter";
import PostRouter from "./router/PostRouter";

// Swagger
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

class Router {

  constructor(server: express.Express) {
    const router = express.Router();

    server.use("/", router);
    router.use("/users", new UserRouter().router);
    router.use("/posts", new PostRouter().router);

    // Swagger config
    // Extended: https://swagger.io/specification/#infoObject
    const options: swaggerJSDoc.Options = {
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

    const spec = swaggerJSDoc(options);

    router.use("/swagger", swaggerUi.serve, swaggerUi.setup(spec));
    router.get("/swagger-json", (req: Request, res: Response) => {
      res.json(spec);
    });

    // 404 route
    router.get("*", (req: Request, res: Response) => {
      res.status(404).send("404");
    });
  }
}

export default Router;
