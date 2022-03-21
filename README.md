# Desafio backend IBM

## ✨Proposta do desafio

O objetivo do projeto seria criar um microserviço para expor APIs de CRUD de livros<br />
Entidades do sistema:

- Books <br/>
`sbn: chave primaria, varchar(13), necessária ser um SBN valido!`<br/>
`name: varchar, não pode ser nulo.`<br/>
`description: varchar, não pode ser nulo`<br/>
`author: varchar, não pode ser nulo`<br/>
`stock: integer, não pode ser nulo`<br/>

Com as seguintes requisitos funcionais:

- Como usuário gostaria adicionar livros no meu microseviço; Os livros devem conter: SBN, Nome, Breve Descrição e Autor e Estoque;
- Como usuário gostaria de ver a listagem (apenas os nomes) de livros que eu tenho em estoque de forma paginada;
- Como usuário gostaria de ver todos os detalhes de um livro específico;
- Como usuário gostaria atualizar dados de um livro. SBN não pode ser alterado;
- Como usuário gostaria de excluir um livro;

Requisitos não funcionais:
- Você deve utilizar o framework Express
- Deve utilzar algum banco de dados (pode ser banco em memória como H2 ou SQLite, porém fique à vontade em utilizar outro banco);
- Para teste utilize o Jest

## 🖥 Tecnologias

- [Typescript](https://github.com/microsoft/TypeScript)
- [Express](https://github.com/expressjs/express)
- [Ts-Node](https://github.com/TypeStrong/ts-node)
- [typeorm](https://github.com/typeorm/typeorm)
- [Eslint](https://github.com/eslint/eslint)
- [Prettier](https://github.com/prettier/prettier)
- [EditorConfig](https://github.com/editorconfig/editorconfig-vscode)
- [ISBN-Utils](https://github.com/JuanMaRuiz/isbn-util)

## ▶️ Para rodar o projeto:

\*🐋 **Sugestão utilizar o docker**: https://hub.docker.com/_/postgres <br />
**1.** Criar um arquivo .env usando como base o .env-sample na raiz do projeto<br />
**2.** Ter o docker instalado e rodar o comando `docker-compose up`<br />

Caso não venha a usar o docker<br />
**1.** Criar um arquivo .env usando como base o .env-sample na raiz do projeto, trocar a chave para `DB_HOST=localhost` <br />
**2.** Dar o comando `yarn` no terminal na pasta do projeto para baixar as dependências<br />
**3.** Ter o postgres instalado, criar um database chamado `ibm_bookdb`, um usuário `postgres` senha `root`<br />
**4.** Rodar a aplicação `yarn dev:server`

caso queira rodar os testes:<br />
**1.** Repita os passos acima para poder rodar a aplicação, menos o passo 4.<br />
**2.** No postgres, criar um database chamado `ibm_mockdb`, um usuário `postgres` senha `root`<br />
**3.** Rodar os testes `yarn test`

---

# Para facilitar os testes um arquivo com as requests para os endpoints do sistema foi exportado do [Insomnia](https://insomnia.rest)

[Basta baixar e importar](https://raw.githubusercontent.com/danielbpc2/ibm-desafio-backend-library/main/Insomnia_Books.json)
