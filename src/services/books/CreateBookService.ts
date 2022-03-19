import Books from "../../models/Books";
import { BooksRepository } from "../../repositories/BooksRepository";

export class CreateBookService {
  /**
   * if executed creates a book.
   * @param book receives book details
   * @returns created book
   */
  public async execute(book: Books): Promise<Books> {
    const { sbn } = book;

    const bookExists = await BooksRepository.findOneBy({ sbn });

    if (bookExists) {
      throw Error("A book with this sbn already exists");
    }

    const createdBook = BooksRepository.create(book);

    await BooksRepository.save(createdBook);

    return createdBook;
  }
}