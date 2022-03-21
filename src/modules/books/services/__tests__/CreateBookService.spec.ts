import AppError from "@shared/errors/AppError";
import Books from "@modules/books/infra/typeorm/entities/Books";
import { CreateBookService } from "../CreateBookService";
import { dataSource } from "@shared/infra/typeorm/__mocks__/mockDatasource";
import { BooksRepository } from "@modules/books/infra/typeorm/repositories/BooksRepository";
import { DeleteBookService } from "../DeleteBookService";

jest.mock("@modules/books/infra/typeorm/repositories/BooksRepository");

beforeAll(async () => {
  await dataSource.initialize();
});

afterAll(async () => {
  await new DeleteBookService().execute("85-359-0277-5");
  await dataSource.destroy();
});

describe("CreateBookService:", () => {
  const mockBook = {
    sbn: "85-359-0277-5",
    description: "mock",
    name: "my book",
    author: "daniel",
    stock: 1,
  };

  describe("execute():", () => {
    it("should create a new book", async () => {
      const book = await new CreateBookService().execute(mockBook);
      expect(book).toBeInstanceOf(Books);
    });
  });

  describe("Errors:", () => {
    it("should have unique sbn", async () => {
      try {
        await new CreateBookService().execute(mockBook);
        await new CreateBookService().execute(mockBook);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error).toHaveProperty("statusCode", 400);
        expect(error).toHaveProperty(
          "message",
          "A book with this sbn already exists"
        );
      }
    });

    it("should have a valid sbn", async () => {
      try {
        await new CreateBookService().execute({ ...mockBook, sbn: "notvalid" });
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error).toHaveProperty("statusCode", 400);
        expect(error).toHaveProperty("message", "The SBN must be valid");
      }
    });
  });
});
