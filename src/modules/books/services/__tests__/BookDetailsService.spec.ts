import Books from "@modules/books/infra/typeorm/entities/Books";
import { DeleteBookService } from "../DeleteBookService";
import { dataSource } from "@shared/infra/typeorm/__mocks__/mockDatasource";
import { BooksRepository } from "@modules/books/infra/typeorm/repositories/BooksRepository";
import { CreateBookService } from "../CreateBookService";
import { BookDetailsService } from "../BookDetailsService";

jest.mock("@modules/books/infra/typeorm/repositories/BooksRepository");

const mockBook = {
  sbn: "85-359-0277-9",
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
  try {
    await new DeleteBookService().execute(mockBook.sbn);
  } catch (error) {
    console.log(error);
  }
  await dataSource.destroy();
});

describe("BookDetailsService:", () => {
  describe("execute():", () => {
    it("should return the details of a book when searching with sbn", async () => {
      const book = await new BookDetailsService().execute(mockBook.sbn);
      expect(book).toBeInstanceOf(Books);
      expect(book).toHaveProperty("sbn", mockBook.sbn);
      expect(book).toHaveProperty("name", mockBook.name);
      expect(book).toHaveProperty("author", mockBook.author);
      expect(book).toHaveProperty("description", mockBook.description);
      expect(book).toHaveProperty("stock", mockBook.stock);
    });

    it("should return the details of a book when searching with something ILike the name", async () => {
      const book = await new BookDetailsService().execute("", "my b");
      expect(book).toBeInstanceOf(Books);
      expect(book).toHaveProperty("sbn", mockBook.sbn);
      expect(book).toHaveProperty("name", mockBook.name);
      expect(book).toHaveProperty("author", mockBook.author);
      expect(book).toHaveProperty("description", mockBook.description);
      expect(book).toHaveProperty("stock", mockBook.stock);
    });

    it("should return null if the book is not found", async () => {
      const book = await new BookDetailsService().execute(
        "",
        "this book does not exist"
      );
      expect(book).toBeNull();
    });
  });
});
