import { Router } from "express";
import Books from "../infra/typeorm/entities/Books";
import { CreateBookService } from "@modules/books/services/CreateBookService";
import { ListBookService } from "@modules/books/services/ListBooksService";
import { BookDetailsService } from "@modules/books/services/BookDetailsService";
import { DeleteBookService } from "@modules/books/services/DeleteBookService";
import { UpdateBookService } from "@modules/books/services/UpdateBookService";

const booksRouter = Router();

/**
 * Requisito:
 * ! Como usuário gostaria de ver a listagem (apenas os nomes) de livros que eu tenho em estoque de forma paginada;
 */
booksRouter.get("/", async (request, response) => {
  let { page } = request.query;

  const parsedPage = parseInt(`${page}`, 10);

  const [bookList, maxPages] = await new ListBookService().execute(parsedPage);

  return response.json({
    books: bookList,
    page: parsedPage ? parsedPage : 1,
    maxPages,
  });
});

/**
 * Requisito:
 * ! Como usuário gostaria de ver todos os detalhes de um livro específico;
 * * Retorna os detalhes do livro pelo sbn ou o livro com o nome mais próximo da pesquisa.
 */
booksRouter.get("/getBookDetails", async (request, response) => {
  const { sbn, name } = request.query;

  const bookDetails = await new BookDetailsService().execute(
    `${sbn}`,
    `${name}`
  );

  return response.json(bookDetails);
});

/**
 * Requisito:
 * ! Como usuário gostaria atualizar dados de um livro. SBN não pode ser alterado;
 * * Faz um update e retorna o livro atualizado
 */
booksRouter.patch("/", async (request, response) => {
  const { name, author, description, stock, sbn }: Books = request.body;

  const book = await new UpdateBookService().execute({
    sbn,
    name,
    author,
    description,
    stock,
  });

  return response.json(book);
});

/**
 * Requisito:
 * ! Como usuário gostaria adicionar livros no meu microseviço; Os livros devem conter: SBN, Nome, Breve Descrição e Autor e Estoque;
 * * Ao enviar os dados do livro cria um novo livro
 */
booksRouter.post("/", async (request, response) => {
  const { sbn, name, author, description, stock }: Books = request.body;

  const book = await new CreateBookService().execute({
    sbn,
    name,
    author,
    description,
    stock,
  });

  return response.json(book);
});

/**
 * Requisito;
 * * Como usuário gostaria de excluir um livro;
 */
booksRouter.delete("/", async (request, response) => {
  const { sbn } = request.query;

  const deletedBook = await new DeleteBookService().execute(`${sbn}`);

  return response.json({
    book: deletedBook,
    deleted: deletedBook ? true : false,
  });
});
export default booksRouter;
