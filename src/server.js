// importa o express
const express = require("express");
// importa o path
const path = require("path");
// importa o fs
const fs = require("fs");
// instancia o express
const app = express();
// caminho da pasta public
const publicPath = path.join(__dirname, "public");
// caminho do index.html
const indexPath = path.join(__dirname, "views", "index.html");
// caminho do admin.html
const adminPath = path.join(__dirname, "views", "admin.html");
// caminho do json de equipamentos
const equipamentosPath = path.join(__dirname, "data", "equipamentos.json");
// importa o express session
const session = require("express-session");
// importa o dotenv
require("dotenv").config();

// middleware para server arquivos estátios da pasta public
app.use(express.static(publicPath));

// middleware para converter o corpo da requisição em json
app.use(express.json());

// middleware session para armazenar os dados do login
app.use(
  session({
    secret: "nodeExpress",
    resave: false,
    saveUninitialized: false,
  })
);

// rota principal respondendo com o index.html
app.get("/", (req, res) => {
  res.status(200).sendFile(indexPath);
});

// rota para formulario de login
app.get("/login", (req, res) => {
  const loginPath = path.join(__dirname, "views", "login.html");
  res.status(200).sendFile(loginPath);
});

// middleware para ler dados de formulários
app.use(express.urlencoded({ extended: true }));

// rota de login
app.post("/login", (req, res) => {
  const { usuario, senha } = req.body;

  if (usuario === process.env.ADM_USER && senha === process.env.ADM_PASSWORD) {
    req.session.usuarioAutenticado = true;
    return res.redirect("/admin");
  }
  res
    .status(401)
    .send("Usuário ou senha inválidos. <a href='/login'>Tentar novamente</a>");
});

//  rota para deslogar/logout
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

// rota do admin preencher o form de equipamento
app.get("/admin", (req, res) => {
  if (!req.session.usuarioAutenticado) {
    return res.redirect("/login");
  }

  res.sendFile(adminPath);
});

// rota para exbir a api de equipamentos
app.get("/api/equipamentos", (req, res) => {
  // const filePath = path.join(__dirname, "data", "equipamentos.json");
  const data = fs.readFileSync(equipamentosPath, "utf-8");
  const equipamentos = JSON.parse(data);
  res.status(200).json(equipamentos.reverse());
});

// rota para exibir equipamentos por id
app.get("/api/equipamentos/:id", (req, res) => {
  const id = req.params.id;
  const data = fs.readFileSync(equipamentosPath, "utf-8");
  const equipamentos = JSON.parse(data);
  const equipamento = equipamentos.find((equipamento) => equipamento.id == id);
  // se nao encontrar o equipamento, retorna erro
  if (!equipamento)
    return res.status(404).send({ error: "Equipamento nao encontrado." });
  // retorna o equipamento
  res.status(200).json(equipamento);
});

// rota para deletar equipamentos
app.delete("/api/equipamentos/:id", (req, res) => {
  const id = req.params.id;
  const data = fs.readFileSync(equipamentosPath, "utf-8");
  const equipamentos = JSON.parse(data);

  const equipamentoIndex = equipamentos.findIndex(
    (equipamento) => equipamento.id == id
  );

  if (equipamentoIndex === -1) {
    return res.status(404).send({ error: "Equipamento não encontrado." });
  }

  equipamentos.splice(equipamentoIndex, 1);

  fs.writeFileSync(equipamentosPath, JSON.stringify(equipamentos, null, 2));
  res.status(204).send(); // sucesso sem conteúdo
});

// rota para receber e salvar um novo equipamento
app.post("/api/equipamentos", (req, res) => {
  const novoEquipamento = req.body;
  // valida os dados do equipamento
  if (
    !novoEquipamento.nome ||
    !novoEquipamento.imagemUrl ||
    !novoEquipamento.preco
  ) {
    return res
      .status(400)
      .send({ error: "Todos os campos devem ser preenchidos." });
  }

  fs.readFile(equipamentosPath, "utf-8", (err, data) => {
    if (err) return res.status(500).send({ error: "Erro ao ler os dados" });

    let lista = [];

    try {
      lista = JSON.parse(data);
    } catch {
      lista = [];
    }

    novoEquipamento.id = Date.now(); // gera um id unico
    lista.push(novoEquipamento); // adiciona o novo equipamento na lista

    fs.writeFile(equipamentosPath, JSON.stringify(lista, null, 2), (err) => {
      if (err)
        return res.status(500).send({ error: "Erro ao salvar os dados" });
      res.status(201).send(novoEquipamento);
    });
  });
});

// rota para atualizar um equipamento


// porta do servidor
const port = 3000;
// inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
