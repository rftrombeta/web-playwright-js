## Introdução
Projeto de automação Web com Playwright e JavaScript

Este projeto utiliza o Playwright para automação de testes em aplicações web. O objetivo é fornecer uma estrutura para escrever e executar testes automatizados de forma eficiente.
***

## 💻 Tecnologias
- [Node.js](https://nodejs.org/en)
- [Playwrjght](https://playwright.dev/)
- JavaScript
- [Faker](https://www.npmjs.com/package/@faker-js/faker)
- [Docker](https://www.docker.com/)
- [MongoDB](https://www.mongodb.com/)

## 🤖 Como executar
1. Faça o clone do repositório.
2. Instale as dependências: `npm install`
4. Inicie o MongoDB usando Docker: `docker run --name mongodb -d -p 27017:27017 mongo`
5. Executar os testes
   1. Headless True: `npx playwright test`
   2. Headless False: `npx playwright test --headed`
***

## Documentação
1. [Documentação Funcional](DOCUMENTAÇÃO-FUNCIONAL.md)
***
