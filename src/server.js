// teste - lista de equipamentos
// Lista de equipamentos atualizada e diversificada
const equipamentos = [
  {
    id: 1,
    nome: "Andaime Tubular",
    imagem: "/images/image.png",
    preco: "R$ 35,00 por dia",
  },
  {
    id: 2,
    nome: "Betoneira 400L",
    imagem: "/images/image.png",
    preco: "R$ 120,00 por dia",
  },
  {
    id: 3,
    nome: "Compactador de Solo",
    imagem: "/images/image.png",
    preco: "R$ 150,00 por dia",
  },
  {
    id: 4,
    nome: "Serra Circular de Bancada",
    imagem: "/images/image.png",
    preco: "R$ 90,00 por dia",
  },
  {
    id: 5,
    nome: "Escora Metálica",
    imagem: "/images/image.png",
    preco: "R$ 12,00 por dia",
  },
  {
    id: 6,
    nome: "Gerador 5kVA",
    imagem: "/images/image.png",
    preco: "R$ 200,00 por dia",
  },
];

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

// rota para equipamentos
app.get("/api/equipamentos", (req, res) => {
  res.json(equipamentos);
});

// porta do servidor
const port = 3000;
// inicia o servidor
app.listen(port, () => {
  console.log("servidor rodando em http://localhost:3000");
});
