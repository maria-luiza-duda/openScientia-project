## Projeto de Login para a disciplina de WEB 2 (IFPE) ##

### Sobre a ideia do projeto

A ideia do projeto surgiu em 2020 com o objetivo de reunir em um único lugar
pesquisadores de diversas áreas, e seus artigos escritos em uma linguagem
mais simples para a comunidade em geral.

### Esse projeto aborda os conteúdos de:

- CRUD básico de cadastro de autores
- Gerenciamento de sessão de login
- Conexão com banco de dados
- Criptografia de senha

### Rodando o projeto:

- Abra o terminal e rode o comando abaixo para baixar todas as dependências necessárias:

```
npm install
```
```
npm start
```
- A database utilizada, juntamente com todos os scripts necessários de banco, está no caminho:

```
/database/bd_openScientia.sql
```

### Principais rotas

- Rota de login para autores cadastrados
```
/login
```
- Rota principal. Lista de todos os autores cadastrados.
```
/autores
```
- Rota de cadastro de autores.
```
/autores/form
```
- Rota de edição de autores.
```
/autores/form?id=1
```


