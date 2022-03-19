import Books from "../../models/Books";
import { BooksRepository } from "../../repositories/BooksRepository";

export class BookDetailsService {
  /**
   * execute the listing of a Book details
   */
  public async execute(sbn: string, name: string): Promise<Books> {
    const book = BooksRepository.findOneOrFail({
      where: [{ sbn }, { name }],
    });

    return book;
  }
}
