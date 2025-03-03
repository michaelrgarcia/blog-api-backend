import express, { Request, Response, NextFunction } from "express";

import indexRouter from "./routes/indexRouter.js";
import postRouter from "./routes/postRouter.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/posts", postRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err.name === "AuthError") {
    res.status(401).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Resource not found" });
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
