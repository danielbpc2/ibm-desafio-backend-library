import { ILike } from "typeorm";
import Books from "../../models/Books";
import { BooksRepository } from "../../repositories/BooksRepository";

export class BookDetailsService {
  /**
   * execute the listing of a Book details
   */
  public async execute(sbn?: string, name?: string): Promise<Books | null> {
    const book = BooksRepository.findOne({
      where: [{ sbn }, { name: ILike(`%${name}%`) }],
    });

    return book;
  }
}
