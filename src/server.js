// importa o path
const path = require("path");
// importa o fs
const fs = require("fs");
// importa o express
const express = require("express");
// instancia o express
const app = express();
// caminho da pasta public
const publicPath = path.join(__dirname, "public");
// caminho do index.html
const indexPath = path.join(__dirname, "views", "index.html");
// caminho do admin.html
const adminPath = path.join(__dirname, "views", "admin.html");

// middleware para server arquivos estátios da pasta public
app.use(express.static(publicPath));

// rota principal respondendo com o index.html
app.get("/", (req, res) => {
  res.status(200).sendFile(indexPath);
});

// rota do admin preencher o form de equipamento
app.get("/admin", (req, res) => {
  res.status(200).sendFile(adminPath);
});

// rota para equipamentos
app.get("/api/equipamentos", (req, res) => {
  const filePath = path.join(__dirname, "data", "equipamentos.json");
  const data = fs.readFileSync(filePath, "utf-8");
  const equipamentos = JSON.parse(data);
  res.json(equipamentos);
});

// rota post para receber e salvar os dados
app.post("/api/equipamentos", (req, res) => {});

// porta do servidor
const port = 3000;
// inicia o servidor
app.listen(port, () => {
  console.log("servidor rodando em http://localhost:3000");
});
