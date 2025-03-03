import passport from "../auth/passportConfig.js";

import { Router } from "express";

import {
  createPost,
  deletePost,
  editPost,
  getPublishedPosts,
  getUnpublishedPosts,
} from "../controllers/postController.js";

const postRouter = Router();

postRouter.get("/published", getPublishedPosts);
postRouter.get(
  "/unpublished",
  passport.authenticate("jwt", { session: false }),
  getUnpublishedPosts
);

postRouter.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createPost
);
postRouter.put(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  editPost
);
postRouter.delete(
  "/delete/:postId",
  passport.authenticate("jwt", { session: false }),
  deletePost
);

export default postRouter;
