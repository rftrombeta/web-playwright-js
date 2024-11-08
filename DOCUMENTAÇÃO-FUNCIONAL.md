# Documentação Funcional do Projeto de Automação Web

## Introdução

Este projeto utiliza o Playwright para automação de testes em aplicações web. O objetivo é fornecer uma estrutura para escrever e executar testes automatizados de forma eficiente.

## Estrutura do Projeto

### Diretórios e Arquivos

- `tests/`: Estrutura principal do projeto contendo os arquivos de testes e configurações.
    - `e2e/`: Contém os testes de ponta a ponta.
        - `login.spec.js`: Testes relacionados à funcionalidade de login.
        - `products.spec.js`: Testes relacionados à adição de produtos ao carrinho e checkout.

- `support/`: Contém arquivos de suporte, como configuração de banco de dados e extensão de contexto do playwright.
    - `actions/`: Contém as classes de ação que encapsulam a lógica de interação com as páginas web. É importante frizar que estamos trabalhando com `page objects`, mas, focando nas funcionalidades, que também podemos chamar de `custom actions`.
        - `AllProducts.js`: Classe para interação com a página de todos os produtos.
        - `Checkout.js`: Classe para interação com a página de checkout.
        - `Login.js`: Classe para interação com a página de login.
        - `ProductDetails.js`: Classe para interação com a página de detalhes do produto.
        - `YourCart.js`: Classe para interação com a página do carrinho.
    - `database.js`: Configuração da conexão com o MongoDB e funções para inserir os detalhes dos produtos no banco de dados.
    - `index.js`: Extensão do contexto de teste do Playwright.
    - `utils.js`: Funções utilitárias, como a geração de dados falsos usando o Faker.