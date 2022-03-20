import Books from "../infra/typeorm/entities/Books";
import { dataSource } from "../../../shared/infra/typeorm";

export const BooksRepository = dataSource.getRepository(Books).extend({});
