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
// caminho do json de equipamentos
const equipamentosPath = path.join(__dirname, "data", "equipamentos.json");

// middleware para server arquivos estátios da pasta public
app.use(express.static(publicPath));
// middleware para converter o corpo da requisição em json
app.use(express.json());

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
  // const filePath = path.join(__dirname, "data", "equipamentos.json");
  const data = fs.readFileSync(equipamentosPath, "utf-8");
  const equipamentos = JSON.parse(data);
  res.json(equipamentos);
});

// rota post para receber e salvar os dados
app.post("/api/equipamentos", (req, res) => {
  const novoEquipamento = req.body;

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

// porta do servidor
const port = 3000;
// inicia o servidor
app.listen(port, () => {
  console.log("servidor rodando em http://localhost:3000");
});
