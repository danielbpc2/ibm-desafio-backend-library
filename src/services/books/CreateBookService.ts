import Books from "../../models/Books";
import { BooksRepository } from "../../repositories/BooksRepository";

export class CreateBookService {
  /**
   * if executed creates a book.
   * @param book receives a book without sbn
   * @returns created book
   */
  public async execute(book: Omit<Books, "sbn">): Promise<Books> {
    const createdBook = BooksRepository.create(book);

    await BooksRepository.save(createdBook);

    return createdBook;
  }
}
