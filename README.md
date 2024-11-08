# web-playwright-js

Projeto de automação Web com Playwright e JavaScript

## Descrição

Este projeto utiliza o Playwright para automação de testes em aplicações web. O objetivo é fornecer uma estrutura para escrever e executar testes automatizados de forma eficiente.

## Pré-requisitos

- Node.js (versão 16 ou superior)
- npm (gerenciador de pacotes do Node.js)
- Docker (para executar o MongoDB em contêiner)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/web-playwright-js.git
   cd web-playwright-js

2. Instale as dependências:

   npm install

3. Inicie o MongoDB usando Docker:
    docker run --name mongodb -d -p 27017:27017 mongo

4. Execute os testes:
    npx playwright test --headed


Estrutura do Projeto
pages/: Contém as classes de página que encapsulam a lógica de interação com as páginas web.
tests/: Contém os arquivos de teste.
database.js: Configuração da conexão com o MongoDB.