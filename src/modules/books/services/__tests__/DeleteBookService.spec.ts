import Books from "@modules/books/infra/typeorm/entities/Books";
import { DeleteBookService } from "../DeleteBookService";
import { dataSource } from "@shared/infra/typeorm/__mocks__/mockDatasource";
import { BooksRepository } from "@modules/books/infra/typeorm/repositories/BooksRepository";
import { CreateBookService } from "../CreateBookService";

jest.mock("@modules/books/infra/typeorm/repositories/BooksRepository");

const mockBook = {
  sbn: "9971-5-0210-0",
  description: "mock",
  name: "my book",
  author: "daniel",
  stock: 1,
};
beforeAll(async () => {
  await dataSource.initialize();
  try {
    await new CreateBookService().execute(mockBook);
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await dataSource.destroy();
});

describe("DeleteBookService:", () => {
  describe("execute():", () => {
    it("should Delete a book", async () => {
      const book = await new DeleteBookService().execute(mockBook.sbn);
      expect(book).toBeInstanceOf(Books);
    });

    it("should return null if it doesn't find a book", async () => {
      const book = await new DeleteBookService().execute(mockBook.sbn);
      expect(book).toBeNull();
    });
  });
});
