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
postRouter.get("/unpublished", getUnpublishedPosts);

postRouter.post("/create", createPost);
postRouter.put("/edit", editPost);
postRouter.delete("/delete", deletePost);

export default postRouter;
