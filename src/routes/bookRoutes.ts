import { Router } from "express";
import Books from "../models/Books";
import { CreateBookService } from "../services/books/CreateBookService";
import { ListBookService } from "../services/books/ListBooksService";
import { BookDetailsService } from "../services/books/BookDetailsService";
import { DeleteBookService } from "../services/books/DeleteBookService";
import { UpdateBookService } from "../services/books/UpdateBookService";

const booksRouter = Router();

/**
 * Requisito:
 * ! Como usuário gostaria de ver a listagem (apenas os nomes) de livros que eu tenho em estoque de forma paginada;
 */
booksRouter.get("/", async (request, response) => {
  try {
    let { page } = request.query;

    const parsedPage = parseInt(`${page}`, 10);

    const [bookList, maxPages] = await new ListBookService().execute(
      parsedPage
    );

    return response.json({
      books: bookList,
      page: parsedPage ? parsedPage : 1,
      maxPages,
    });
  } catch (error) {
    return response
      .status(500)
      .json("There was an error while trying to retrive book list");
  }
});

/**
 * Requisito:
 * ! Como usuário gostaria de ver todos os detalhes de um livro específico;
 * * Retorna os detalhes do livro pelo sbn ou o livro com o nome mais próximo da pesquisa.
 */
booksRouter.get("/getBookDetails", async (request, response) => {
  try {
    const { sbn, name } = request.query;

    const bookDetails = await new BookDetailsService().execute(
      `${sbn}`,
      `${name}`
    );

    return response.json(bookDetails);
  } catch (error) {
    return response
      .status(500)
      .json("There was an error while trying to retrive book details");
  }
});

/**
 * Requisito:
 * ! Como usuário gostaria atualizar dados de um livro. SBN não pode ser alterado;
 * * Faz um update e retorna o livro atualizado
 */
booksRouter.patch("/", async (request, response) => {
  try {
    const { name, author, description, stock, sbn }: Books = request.body;

    const book = await new UpdateBookService().execute({
      sbn,
      name,
      author,
      description,
      stock,
    });

    return response.json(book);
  } catch (error) {
    return response.status(400).json(error?.message);
  }
});

/**
 * Requisito:
 * ! Como usuário gostaria adicionar livros no meu microseviço; Os livros devem conter: SBN, Nome, Breve Descrição e Autor e Estoque;
 * * Ao enviar os dados do livro cria um novo livro
 */
booksRouter.post("/", async (request, response) => {
  try {
    const { sbn, name, author, description, stock }: Books = request.body;

    const book = await new CreateBookService().execute({
      sbn,
      name,
      author,
      description,
      stock,
    });

    return response.json(book);
  } catch (error) {
    return response.status(400).json(error?.message);
  }
});

/**
 * Requisito;
 * * Como usuário gostaria de excluir um livro;
 */
booksRouter.delete("/", async (request, response) => {
  try {
    const { sbn } = request.query;

    const deletedBook = await new DeleteBookService().execute(`${sbn}`);

    return response.json({
      book: deletedBook,
      deleted: deletedBook ? true : false,
    });
  } catch (error) {
    return response.json("There was an error while trying to delete a book");
  }
});
export default booksRouter;
