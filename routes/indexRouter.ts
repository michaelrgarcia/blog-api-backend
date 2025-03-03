import { Router } from "express";
import { login, register } from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.post("/register", register);
indexRouter.post("/login", login);

export default indexRouter;
