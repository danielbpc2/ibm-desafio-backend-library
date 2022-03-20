import { Request, Response } from "express";
import { ListBookService } from "@modules/books/services/ListBooksService";
import { BookDetailsService } from "@modules/books/services/BookDetailsService";
import { DeleteBookService } from "@modules/books/services/DeleteBookService";
import { CreateBookService } from "@modules/books/services/CreateBookService";
import { UpdateBookService } from "@modules/books/services/UpdateBookService";
import Books from "../../typeorm/entities/Books";

export default class BookController {
  public async index(request: Request, response: Response): Promise<Response> {
    let { page } = request.query;

    const parsedPage = parseInt(`${page}`, 10);

    const [bookList, maxPages] = await new ListBookService().execute(
      parsedPage
    );

    return response.json({
      books: bookList,
      page: parsedPage ? parsedPage : 1,
      maxPages,
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { sbn, name } = request.query;

    const bookDetails = await new BookDetailsService().execute(
      `${sbn}`,
      `${name}`
    );

    return response.json(bookDetails);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { sbn, name, author, description, stock }: Books = request.body;

    const book = await new CreateBookService().execute({
      sbn,
      name,
      author,
      description,
      stock,
    });

    return response.json(book);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, author, description, stock, sbn }: Books = request.body;

    const book = await new UpdateBookService().execute({
      sbn,
      name,
      author,
      description,
      stock,
    });

    return response.json(book);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { sbn } = request.query;

    const deletedBook = await new DeleteBookService().execute(`${sbn}`);

    return response.json({
      book: deletedBook,
      deleted: deletedBook ? true : false,
    });
  }
}
