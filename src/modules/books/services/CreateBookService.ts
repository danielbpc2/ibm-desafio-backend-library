import AppError from "@errors/AppError";
import Books from "@modules/books/infra/typeorm/entities/Books";
import { BooksRepository } from "@modules/books/infra/typeorm/repositories/BooksRepository";

const { validate } = require("isbn-util");
export class CreateBookService {
  /**
   * if executed creates a book.
   * @param book receives book details
   * @returns created book
   */
  public async execute(book: Books): Promise<Books> {
    const { sbn } = book;

    // if the sbn is not of a valid ISBN format throws error.
    if (!validate(sbn)) {
      throw new AppError("The SBN must be valid");
    }

    const bookExists = await BooksRepository.findOneBy({ sbn });
    if (bookExists) {
      throw new AppError("A book with this sbn already exists");
    }

    const createdBook = BooksRepository.create(book);

    await BooksRepository.save(createdBook);

    return createdBook;
  }
}
