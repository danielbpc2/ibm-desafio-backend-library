import Books from "../../models/Books";
import { BooksRepository } from "../../repositories/BooksRepository";

export class UpdateBookService {
  /**
   * execute the criation of a Book
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
