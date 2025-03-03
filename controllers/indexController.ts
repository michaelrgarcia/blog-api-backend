import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

import { authError } from "../errors/authError.js";

config();

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, password } = req.body;

  try {
    const hashedPassword = await hash(password, 10);

    const prisma = new PrismaClient();

    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    res.status(200).json({ message: "User successfully registered" });
  } catch (err: any) {
    console.error(err);

    return next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;

    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) throw authError("User not found");

    const match = await compare(password, user.password);

    if (!match) throw authError("Incorrect password");

    const token = jwt.sign({ username }, String(process.env.JWT_SECRET));

    res.status(200).json({ message: "Authentication successful", token });
  } catch (err: any) {
    console.error(err);

    return next(err);
  }
}
