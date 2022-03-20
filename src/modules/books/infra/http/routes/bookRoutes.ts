import { Router } from "express";
import BooksController from "@modules/books/infra/http/controllers/BooksController";

const booksRouter = Router();
const booksController = new BooksController();

/**
 * Requisito:
 * ! Como usuário gostaria de ver a listagem (apenas os nomes) de livros que eu tenho em estoque de forma paginada;
 */
booksRouter.get("/", booksController.index);

/**
 * Requisito:
 * ! Como usuário gostaria de ver todos os detalhes de um livro específico;
 * * Retorna os detalhes do livro pelo sbn ou o livro com o nome mais próximo da pesquisa.
 */
booksRouter.get("/getBookDetails", booksController.show);

/**
 * Requisito:
 * ! Como usuário gostaria atualizar dados de um livro. SBN não pode ser alterado;
 * * Faz um update e retorna o livro atualizado
 */
booksRouter.patch("/", booksController.update);

/**
 * Requisito:
 * ! Como usuário gostaria adicionar livros no meu microseviço; Os livros devem conter: SBN, Nome, Breve Descrição e Autor e Estoque;
 * * Ao enviar os dados do livro cria um novo livro
 */
booksRouter.post("/", booksController.create);

/**
 * Requisito;
 * * Como usuário gostaria de excluir um livro;
 */
booksRouter.delete("/", booksController.delete);

export default booksRouter;
