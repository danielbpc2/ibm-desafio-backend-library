import AppError from "@shared/errors/AppError";
import Books from "@modules/books/infra/typeorm/entities/Books";
import { DeleteBookService } from "../DeleteBookService";
import { CreateBookService } from "../CreateBookService";
import { UpdateBookService } from "../UpdateBookService";
import { dataSource } from "@shared/infra/typeorm/__mocks__/mockDatasource";
import { BooksRepository } from "@modules/books/infra/typeorm/repositories/BooksRepository";

jest.mock("@modules/books/infra/typeorm/repositories/BooksRepository");

const mockBook = {
  sbn: "85-359-0277-3",
  description: "mock",
  name: "my book",
  author: "daniel",
  stock: 1,
};

const editedMockBook = {
  sbn: "85-359-0277-3",
  name: "my book edited",
  author: "Ricardo was here",
  description: "edited mock",
  stock: 2,
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

describe("UpdateBookService:", () => {
  describe("execute():", () => {
    it("should find a book by snm and update its contents", async () => {
      const book = await new UpdateBookService().execute(editedMockBook);
      expect(book).toHaveProperty("sbn", mockBook.sbn);
      expect(book).toHaveProperty("name", editedMockBook.name);
      expect(book).toHaveProperty("author", editedMockBook.author);
      expect(book).toHaveProperty("description", editedMockBook.description);
      expect(book).toHaveProperty("stock", editedMockBook.stock);
    });
  });

  describe("Errors:", () => {
    it("should throw an AppError when the book it's not found", async () => {
      try {
        await new UpdateBookService().execute({
          ...editedMockBook,
          sbn: "notfound",
        });
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error).toHaveProperty("statusCode", 404);
        expect(error).toHaveProperty("message", "Book not found");
      }
    });
  });
});
