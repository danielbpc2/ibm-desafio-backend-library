import { Request, Response } from "express";
import { ListBooksService } from "@modules/books/services/ListBooksService";
import { BookDetailsService } from "@modules/books/services/BookDetailsService";
import { DeleteBookService } from "@modules/books/services/DeleteBookService";
import { CreateBookService } from "@modules/books/services/CreateBookService";
import { UpdateBookService } from "@modules/books/services/UpdateBookService";
import Books from "../../typeorm/entities/Books";

export default class BookController {
  /**
   * Show all books names with stock > 0
   * @param request
   * @param response
   * @returns {books: [{name: string}], page: number, maxPages: number ]}
   */
  public async index(request: Request, response: Response): Promise<Response> {
    let { page } = request.query;

    const parsedPage = parseInt(`${page}`, 10);

    const [bookList, maxPages] = await new ListBooksService().execute(
      parsedPage
    );

    return response.json({
      books: bookList,
      page: parsedPage ? parsedPage : 1,
      maxPages,
    });
  }

  /**
   * show details of a book
   * @param request receives in a query sbn or name and uses to find it
   * @param response
   * @returns Book
   */
  public async show(request: Request, response: Response): Promise<Response> {
    const { sbn, name } = request.query;

    const bookDetails = await new BookDetailsService().execute(
      `${sbn}`,
      `${name}`
    );

    return response.json(bookDetails);
  }

  /**
   * creates a new book
   * @param request receive a book information.
   * @param response
   * @returns the created book
   */
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

  /**
   * find a book by SBN, and updates all of it's info besides the sbn.
   * @param request modified book
   * @param response
   * @returns edited book
   */
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

  /**
   * deletes a book of given sbn
   * @param request sbn
   * @param response
   * @returns {book: deleted book, deleted: boolean}
   */
  public async delete(request: Request, response: Response): Promise<Response> {
    const { sbn } = request.query;

    const deletedBook = await new DeleteBookService().execute(`${sbn}`);

    return response.json({
      book: deletedBook,
      deleted: deletedBook ? true : false,
    });
  }
}
