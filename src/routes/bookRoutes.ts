import { Router } from "express";
import Books from "../models/Books";
import { CreateBookService } from "../services/createBookService";

const booksRouter = Router();

booksRouter.get("/", (_request, response) => {
  return response.json({ success: "oh books" });
});

// Create Book Route
booksRouter.post("/", async (request, response) => {
  try {
    console.log(request.body);
    const { name, author, description, stock }: Books = request.body;
    const book = new CreateBookService().execute({
      name,
      author,
      description,
      stock,
    });
    return response.json(book);
  } catch (error) {
    return response.json(error);
  }
});

export default booksRouter;
