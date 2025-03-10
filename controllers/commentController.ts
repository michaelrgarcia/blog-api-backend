import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { getParsedJwt } from "../utils/jwtHelpers.js";
import { authError } from "../errors/authError.js";

export async function createComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { parentPostId, content } = req.body;

    const parsedJwt = getParsedJwt(
      String(req.headers.authorization?.split(" ")[1])
    );

    const prisma = new PrismaClient();

    await prisma.comment.create({
      data: {
        authorId: Number(parsedJwt!.id),
        parentPostId: Number(parentPostId),
        content,
      },
    });

    res.status(200).json({ message: "Comment created" });
  } catch (err: any) {
    console.error(err);

    return next(err);
  }
}

export async function editComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { commentId, content } = req.body;

    const prisma = new PrismaClient();

    const matchingComment = await prisma.comment.findUnique({
      where: {
        id: Number(commentId),
      },
    });

    const parsedJwt = getParsedJwt(
      String(req.headers.authorization?.split(" ")[1])
    );

    if (parsedJwt!.id !== matchingComment?.authorId)
      throw authError("You cannot edit another user's comment.");

    await prisma.comment.update({
      where: {
        id: Number(commentId),
      },
      data: {
        content,
      },
    });

    res.status(200).json({ message: "Comment updated" });
  } catch (err: any) {
    console.error(err);

    return next(err);
  }
}

export async function deleteComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { commentId } = req.params;

    const prisma = new PrismaClient();

    const matchingComment = await prisma.comment.findUnique({
      where: {
        id: Number(commentId),
      },
    });

    const parsedJwt = getParsedJwt(
      String(req.headers.authorization?.split(" ")[1])
    );

    if (parsedJwt!.id !== matchingComment?.authorId)
      throw authError("You cannot delete another user's comment.");

    await prisma.comment.delete({
      where: {
        id: Number(commentId),
      },
    });

    res.status(200).json({ message: "Comment deleted" });
  } catch (err: any) {
    console.error(err);

    return next(err);
  }
}
