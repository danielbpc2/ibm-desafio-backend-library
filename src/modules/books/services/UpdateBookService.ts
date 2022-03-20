import Books from "@modules/books/infra/typeorm/entities/Books";
import { BooksRepository } from "@modules/books/infra/typeorm/repositories/BooksRepository";
import AppError from "@errors/AppError";
export class UpdateBookService {
  /**
   * if executed finds a book and updates it.
   * @param book receives a book
   * @returns updated book
   */
  public async execute(book: Books): Promise<Books | null> {
    const { author, description, name, sbn, stock } = book;

    const bookToBeEdited = await BooksRepository.findOneBy({ sbn });

    if (!bookToBeEdited) throw new AppError("Book not found", 404);

    await BooksRepository.update(sbn, {
      author,
      description,
      name,
      stock,
    });

    return book;
  }
}
