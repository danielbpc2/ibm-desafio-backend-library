import Books from "@modules/books/models/Books";
import { BooksRepository } from "@modules/books/repositories/BooksRepository";

export class DeleteBookService {
  /**
   * if executed deletes a found book.
   * @param sbn indentifier string from a book
   * @returns deleted book
   */
  public async execute(sbn: string): Promise<Books | null> {
    const bookToBeDeleted = BooksRepository.findOneBy({ sbn });

    await BooksRepository.delete(sbn);

    return bookToBeDeleted;
  }
}
