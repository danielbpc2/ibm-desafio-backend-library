import { Router } from "express";

const booksRouter = Router();

booksRouter.get("/", (_request, response) => {
  return response.json({ success: "oh books" });
});

export default booksRouter;
