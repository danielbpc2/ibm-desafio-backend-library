import { MoreThan } from "typeorm";
import Books from "../../models/Books";
import { BooksRepository } from "../../repositories/BooksRepository";

export class ListBookService {
  /**
   * if execited returns a list of the books with stock above 0 and the last page number
   * @param page number of the page to be returned
   * @returns [the list of the books, last page number]
   */
  public async execute(page: number): Promise<[Books[], number]> {
    const take = 2;
    const skip = page ? (page - 1) * take : 0 * take;

    const [booklist, count] = await BooksRepository.findAndCount({
      select: { name: true },
      where: { stock: MoreThan(0) },
      take,
      skip,
    });

    return [booklist, Math.ceil(count / take)];
  }
}
