import passport from "../auth/passportConfigUser.js";

import { Router } from "express";
import {
  createComment,
  deleteComment,
  editComment,
} from "../controllers/commentController.js";

const commentRouter = Router();

commentRouter.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createComment
);

commentRouter.put(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  editComment
);

commentRouter.delete(
  "/:commentId/delete",
  passport.authenticate("jwt", { session: false }),
  deleteComment
);

export default commentRouter;
