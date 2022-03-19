import Books from "../models/Books";
import { BooksRepository } from "../repositories/BooksRepository";

export class CreateBookService {
  /**
   * execute the criation of a Book
   */
  public async execute(book: Omit<Books, "sbn">): Promise<Books> {
    const createdBook = BooksRepository.create(book);

    await BooksRepository.save(createdBook);

    return createdBook;
  }
}
