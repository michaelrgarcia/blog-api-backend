import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

export async function getPublishedPosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // ADD JWT AUTH !!!!

    const prisma = new PrismaClient();

    const posts = await prisma.post.findMany({
      select: {
        title: true,
        content: true,
        uploaded: true,
        author: {
          select: {
            username: true,
          },
        },
      },
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
    // ADD JWT AUTH !!!!

    const prisma = new PrismaClient();

    const posts = await prisma.post.findMany({
      select: {
        title: true,
        content: true,
        uploaded: true,
        author: {
          select: {
            username: true,
          },
        },
      },
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
    // ADD JWT AUTH !!!!

    const { authorId, title, content, published, uploaded } = req.body;

    const prisma = new PrismaClient();

    await prisma.user.findUniqueOrThrow({
      where: {
        id: Number(authorId),
        role: "BLOGGER",
      },
    });

    await prisma.post.create({
      data: {
        authorId: Number(authorId),
        title,
        content,
        published,
        uploaded,
      },
    });

    res.status(200).json({ message: "Post created" });
  } catch (err: any) {
    console.error(err);

    return next(err);
  }
}

export function editPost(req: Request, res: Response) {
  res.status(200).json({ message: "Success" });
}

export function deletePost(req: Request, res: Response) {
  res.status(200).json({ message: "Success" });
}
