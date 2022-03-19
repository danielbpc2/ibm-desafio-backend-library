import { Router } from "express";
import Books from "../models/Books";
import { CreateBookService } from "../services/books/CreateBookService";
import { ListBookService } from "../services/books/ListBooksService";
import { BookDetailsService } from "../services/books/BookDetailsService";

const booksRouter = Router();

// - Como usuário gostaria de ver a listagem (apenas os nomes) de livros que eu tenho em estoque de forma paginada;
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

// - Como usuário gostaria de ver todos os detalhes de um livro específico;
// * Retorna os detalhes do livro pelo sbn ou o livro com o nome mais próximo da pesquisa.
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

// - Como usuário gostaria atualizar dados de um livro. SBN não pode ser alterado;
// Create Book Route
// - Como usuário gostaria adicionar livros no meu microseviço; Os livros devem conter: SBN, Nome, Breve Descrição e Autor e Estoque;
booksRouter.post("/", async (request, response) => {
  try {
    const { name, author, description, stock }: Books = request.body;
    const book = await new CreateBookService().execute({
      name,
      author,
      description,
      stock,
    });
    return response.json(book);
  } catch (error) {
    return response.status(400).json("There was an error with your request");
  }
});
// - Como usuário gostaria de excluir um livro;

export default booksRouter;
