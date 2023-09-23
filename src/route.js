// arquivo de routes para poder fazer as requisições HTTP

import { Router } from "express";
import { db } from "./db.js";
import { randomUUID } from "node:crypto"; // gera um randomUUID
import bcrypt from "bcrypt"; // Lib para criptografar e descriptografar senhas

export const routerMain = Router(); // Instanciando uma Rota

//rota com method GET, chamando o endpoint /users, que devolve os users do banco de dados fake
routerMain.get("/users", (req, res) => {
  const users = db.users;
  return res.status(200).json({ users });
});

// Criando rota para criar usuários e criptografar as senhas;
routerMain.post("/users", async (req, res) => {
  try {
    // Gere um "salt" (um valor aleatório usado para aumentar a segurança da senha)
    // com 10 rounds de hashing, tornando a quebra da senha mais difícil.
    const salt = await bcrypt.genSalt(10);

    // Extraia o nome de usuário e senha do corpo da requisição.
    const { name, password } = req.body;

    // Crie uma hash segura para a senha usando o "salt" gerado anteriormente.
    const hashedPassword = await bcrypt.hash(password, salt);
    /*
    Poderiamos usar dessa maneira também
    const hashedPassword = await bcrypt.hash(password, 10);
    */

    // Insira os dados do usuário no banco de dados fictício.
    const user = { id: randomUUID(), name, hashedPassword };
    db.users.push(user);

    // Envie uma resposta de sucesso para o cliente, informando que o usuário foi criado.
    return res.status(201).json(user);
  } catch (error) {
    // Em caso de erro, retorne um status HTTP 500 (Erro Interno do Servidor).
    return res.status(500).send();
  }
});

// Criando uma rota de login para comparar as senhas e verificar se correspondem.
routerMain.post("/users/login", async (req, res) => {
  // Procurando no banco de dados fictício o usuário com o mesmo nome fornecido no corpo da requisição.
  const user = db.users.find(user => user.name === req.body.name);

  // Verificando se o usuário não foi encontrado; se não foi encontrado, retornamos uma mensagem de erro.
  if (!user) {
    return res.status(400).send("Usuário não encontrado");
  }

  try {
    // Extraindo a senha do corpo da requisição.
    const { password } = req.body;

    // Comparando a senha fornecida no corpo da requisição com a senha armazenada no banco de dados para o usuário.
    // A resposta é armazenada na variável isValidPassword como um valor booleano.
    const isValidPassword = await bcrypt.compare(password, user.hashedPassword);

    // Verificando se a senha não é válida; se não for válida, retornamos uma mensagem de erro.
    if (!isValidPassword) {
      return res.status(401).send("Senha incorreta");
    }

    // Se a senha for válida, enviamos uma resposta de sucesso.
    res.status(200).send("Sucesso");
  } catch (error) {
    // Em caso de erro, retornamos um status HTTP 500 (Erro Interno do Servidor).
    res.status(500).send();
  }
});

