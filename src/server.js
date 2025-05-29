// importa o path
const path = require("path");
// importa o express
const express = require("express");
// instancia o express
const app = express();
// caminho da pasta public
const publicPath = path.join(__dirname, "public");
// caminho do index.html
const indexPath = path.join(__dirname, "views", "index.html");

// middleware para server arquivos estátios da pasta public
app.use(express.static(publicPath));

// rota principal respondendo com o index.html
app.get("/", (req, res) => {
  res.sendFile(indexPath);
});

// porta do servidor
const port = 3000;
// inicia o servidor
app.listen(port, () => {
  console.log("servidor rodando em http://localhost:3000");
});
