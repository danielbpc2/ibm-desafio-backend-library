import { ILike } from "typeorm";
import Books from "../../models/Books";
import { BooksRepository } from "../../repositories/BooksRepository";

export class BookDetailsService {
  /**
   * if executed finds a book by its sbn or name.
   * @param sbn string idenfier of a book
   * @param name name of the book
   * @returns found book.
   */
  public async execute(sbn?: string, name?: string): Promise<Books | null> {
    const book = BooksRepository.findOne({
      where: [{ sbn }, { name: ILike(`%${name}%`) }],
    });

    return book;
  }
}
