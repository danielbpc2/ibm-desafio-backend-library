import Books from "../../entities/Books";
import { dataSource } from "@shared/infra/typeorm/__mocks__/mockDatasource";

export const BooksRepository = dataSource.getRepository(Books);
