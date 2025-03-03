import { Request, Response } from "express";

export function indexGet(req: Request, res: Response) {
  res.status(200).json({ message: "Success" });
}
