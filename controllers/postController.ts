import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const postsQuery = {
  select: {
    id: true,
    title: true,
    author: {
      select: {
        username: true,
      },
    },
    content: true,
    uploaded: true,
    lastModified: true,
    comments: {
      select: {
        id: true,
        author: {
          select: {
            username: true,
          },
        },
        content: true,
        uploaded: true,
        lastModified: true,
      },
    },
  },
};

export async function getPublishedPosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const prisma = new PrismaClient();

    const posts = await prisma.post.findMany({
      ...postsQuery,
      where: {
        published: true,
      },
    });

    res.status(200).json(posts);
  } catch (err: any) {
    console.error(err);

    return next(err);
  }
}

export async function getUnpublishedPosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const prisma = new PrismaClient();

    const posts = await prisma.post.findMany({
      ...postsQuery,
      where: {
        published: false,
      },
    });

    res.status(200).json(posts);
  } catch (err: any) {
    console.error(err);

    return next(err);
  }
}

export async function createPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { authorId, title, content } = req.body;

    const prisma = new PrismaClient();

    await prisma.post.create({
      data: {
        authorId: Number(authorId),
        title,
        content,
      },
    });

    res.status(200).json({ message: "Post created" });
  } catch (err: any) {
    console.error(err);

    return next(err);
  }
}

export async function editPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { postId, title, content } = req.body;

    const prisma = new PrismaClient();

    await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        title,
        content,
      },
    });

    res.status(200).json({ message: "Post updated" });
  } catch (err: any) {
    console.error(err);

    return next(err);
  }
}

export async function updatePublishStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { postId, published } = req.body;

    const prisma = new PrismaClient();

    await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        published,
      },
    });

    res.status(200).json({ message: "Publish status updated" });
  } catch (err: any) {
    console.error(err);

    return next(err);
  }
}

export async function deletePost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { postId } = req.params;

    const prisma = new PrismaClient();

    await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });

    res.status(200).json({ message: "Post deleted" });
  } catch (err: any) {
    console.error(err);

    return next(err);
  }
}
