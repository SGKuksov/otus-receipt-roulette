import express, {Router, Request, Response, NextFunction} from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello, app!");
});

export default router;