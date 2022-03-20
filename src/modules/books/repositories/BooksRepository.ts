import Books from "../models/Books";
import { dataSource } from "../../../database";

export const BooksRepository = dataSource.getRepository(Books).extend({});
