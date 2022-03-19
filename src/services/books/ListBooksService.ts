import { MoreThan } from "typeorm";
import Books from "../../models/Books";
import { BooksRepository } from "../../repositories/BooksRepository";

export class ListBookService {
  /**
   * execute the listing of all books paginated.
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
