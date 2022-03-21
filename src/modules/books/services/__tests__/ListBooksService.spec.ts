import AppError from "@shared/errors/AppError";
import { ListBooksService } from "../ListBooksService";
import { dataSource } from "@shared/infra/typeorm/__mocks__/mockDatasource";
import { BooksRepository } from "@modules/books/infra/typeorm/repositories/BooksRepository";
import { CreateBookService } from "../CreateBookService";
import { DeleteBookService } from "../DeleteBookService";

jest.mock("@modules/books/infra/typeorm/repositories/BooksRepository");

const mockBook1 = {
  sbn: "99921-58-10-7",
  description: "mock",
  name: "my book",
  author: "daniel",
  stock: 1,
};
const mockBook2 = {
  sbn: "0-684-84328-5",
  description: "mock",
  name: "my book 2",
  author: "daniel",
  stock: 0,
};
const mockBook3 = {
  sbn: "0-85131-041-9",
  description: "mock",
  name: "my book 3",
  author: "daniel",
  stock: 1,
};

beforeAll(async () => {
  await dataSource.initialize();
  try {
    const service = new CreateBookService();
    await service.execute(mockBook1);
    await service.execute(mockBook2);
    await service.execute(mockBook3);
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  const deleteService = new DeleteBookService();
  await deleteService.execute(mockBook1.sbn);
  await deleteService.execute(mockBook2.sbn);
  await deleteService.execute(mockBook3.sbn);
  await dataSource.destroy();
});

describe("ListBooksService:", () => {
  describe("execute():", () => {
    it("should return List book with stock > 0", async () => {
      const [books, _maxPages] = await new ListBooksService().execute(1);
      expect(books.length).toEqual(2);
      books.forEach((book) => {
        expect(book.name).not.toEqual("my book 2");
      });
    });

    it("should return first page if its given a invalid page", async () => {
      const [books, _maxPages] = await new ListBooksService().execute(NaN);
      expect(books[0]).toHaveProperty("name", "my book");
    });
  });

  describe("Errors:", () => {
    it("should throw an AppError if page is bigger than max pages", async () => {
      try {
        await new ListBooksService().execute(5);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error).toHaveProperty("statusCode", 404);
        expect(error).toHaveProperty("message", "This page does not exist");
      }
    });
  });
});
