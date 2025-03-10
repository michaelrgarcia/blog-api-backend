import passport from "../auth/passportConfigBlogger.js";

import { Router } from "express";

import {
  createPost,
  deletePost,
  editPost,
  getPublishedPosts,
  getUnpublishedPosts,
  updatePublishStatus,
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
postRouter.put(
  "/publish",
  passport.authenticate("jwt", { session: false }),
  updatePublishStatus
);
postRouter.put(
  "/unpublish",
  passport.authenticate("jwt", { session: false }),
  updatePublishStatus
);

postRouter.delete(
  "/delete/:postId",
  passport.authenticate("jwt", { session: false }),
  deletePost
);

export default postRouter;
