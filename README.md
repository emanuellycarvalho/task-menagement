# Smart Tasker

## Descrição do Projeto
Este projeto é uma aplicação web de gerenciamento de tarefas que permite aos usuários criar, atribuir e monitorar suas tarefas de forma eficiente. A aplicação utiliza Laravel para o desenvolvimento do backend e React para a interface do usuário.

## Requisitos do Sistema
- PHP >= 7.4
- Composer
- Node.js
- NPM
- Banco de dados MySQL

## Instalação

### Configuração do Backend (Laravel)
1. Clone o repositório: `git clone https://github.com/emanuellycarvalho/task-menagement.git`
2. Navegue até o diretório do backend: `cd task-menagement/backend`
3. Instale as dependências do Laravel: `composer install`
4. Copie o arquivo de configuração: `cp .env.example .env`
5. Configure o arquivo `.env` com as informações do seu banco de dados.
6. Gere a chave da aplicação: `php artisan key:generate`
7. Execute as migrações do banco de dados: `php artisan migrate`
8. Inicie o servidor: `php artisan serve`

### Configuração do Frontend (React)
1. Navegue até o diretório do frontend: `cd task-menagement/frontend`
2. Instale as dependências do React: `npm install`
3. Inicie o servidor de desenvolvimento: `npm start`

## Uso
1. Acesse a aplicação no navegador: `http://localhost:3000`.
2. Crie uma conta ou faça login se já tiver uma.
3. Explore a interface para criar, atribuir e monitorar tarefas.
4. [TODO] Usuários iniciais

## Funcionalidades
- **Cadastro de Usuários:** Permita que os usuários se cadastrem na aplicação.
- **Autenticação:** Mecanismo de autenticação seguro para proteger as informações dos usuários.
- **Gerenciamento de Tarefas:** CRUD completo para criar, ler, atualizar e excluir tarefas.
- **Atribuição de Tarefas:** Atribua tarefas a usuários específicos.
- **Visualização de Tarefas:** Monitore o status e detalhes das tarefas em uma interface intuitiva.

## Template Base
## Template Base
Este projeto foi desenvolvido utilizando como base o template [Black Dashboard React](https://www.creative-tim.com/product/black-dashboard-react/?AFFILIATE=52980#) da Creative Tim. A documentação completa do template pode ser acessada [aqui](https://demos.creative-tim.com/black-dashboard-react/#/documentation/overview). Consulte-a para obter informações detalhadas sobre a estrutura, componentes e personalizações disponíveis no template.


## Licença
Este projeto é licenciado sob a [Licença MIT](LICENSE).
