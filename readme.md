# README - API de Cadastro de Usuários com Criptografia de Senha

Este é um exemplo de uma API simples criada com Node.js e Express para cadastrar usuários em um banco de dados fictício, criptografando as senhas e verificando-as usando a biblioteca bcrypt. A API oferece três rotas principais: listar usuários, cadastrar usuários e fazer login.

## Instalação

Para executar este projeto em sua máquina, siga as etapas abaixo:

1. Certifique-se de que você tem o Node.js instalado em sua máquina. Caso contrário, faça o download e instale [Node.js](https://nodejs.org/).

2. Clone este repositório em sua máquina:

   ```shell
   git clone [<>](https://github.com/hamiceis/node-bcrypt-auth.git)

3. cd <nome_do_diretorio>

4. Instalação do projeto

```shell
  npm install
```

5. Inicie o servidor

```
  npm run dev
```


## Rotas da API

### Listar Usuários
Rota: GET /users

Descrição: Retorna todos os usuários cadastrados no banco de dados fictício.

Resposta de Exemplo:

```
{
  "users": [
    {
      "id": "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
      "name": "exemplo",
      "hashedPassword": "$2b$10$2SWzv9SRg7FD0J2/sVUd3eBToUZKTJCV5uBLCQvVCQpbfRQ9cZ1zm"
    }
  ]
}

```


### Cadastrar Usuário
Rota: POST /users

Descrição: Cadastra um novo usuário no banco de dados fictício, criptografando a senha fornecida.

Corpo da Requisição de Exemplo:


```
{
  "name": "novo_usuario",
  "password": "senha_secreta"
}
`

Resposta de Exemplo:

```
{
  "id": "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
  "name": "novo_usuario",
  "hashedPassword": "$2b$10$2SWzv9SRg7FD0J2/sVUd3eBToUZKTJCV5uBLCQvVCQpbfRQ9cZ1zm"
}
`


### Login do Usuário
Rota: POST /users/login

Descrição: Verifica se o usuário existe no banco de dados fictício e se a senha fornecida corresponde à senha armazenada.

Corpo da Requisição de Exemplo:

```
{
  "name": "exemplo",
  "password": "senha_secreta"
}

```

- Resposta de Exemplo (Sucesso): Retorna um status HTTP 200 e a mensagem "Sucesso".

- Resposta de Exemplo (Senha Incorreta): Retorna um status HTTP 401 e a mensagem "Senha incorreta".

- Resposta de Exemplo (Usuário Não Encontrado): Retorna um status HTTP 400 e a mensagem "Usuário não encontrado".



Considerações Finais
Este é um exemplo simples de uma API de cadastro de usuários com criptografia de senha usando Node.js, Express e bcrypt. Lembre-se de que esta é uma aplicação fictícia para fins de demonstração. Em um cenário real, você deve adicionar medidas adicionais de segurança, como autenticação de token e validação de entrada de dados.
