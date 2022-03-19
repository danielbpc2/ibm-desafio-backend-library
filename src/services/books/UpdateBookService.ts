import Books from "../../models/Books";
import { BooksRepository } from "../../repositories/BooksRepository";

export class UpdateBookService {
  /**
   * if executed finds a book and updates it.
   * @param book receives a book
   * @returns updated book
   */
  public async execute(book: Books): Promise<Books | null> {
    const { author, description, name, sbn, stock } = book;

    const bookToBeEdited = await BooksRepository.findOneBy({ sbn });

    if (!bookToBeEdited) throw Error("Book not found");

    await BooksRepository.update(sbn, {
      author,
      description,
      name,
      stock,
    });

    return book;
  }
}
