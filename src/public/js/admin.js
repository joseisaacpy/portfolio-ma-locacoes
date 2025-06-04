// READ
async function carregarEquipamentos() {
  try {
    const resposta = await fetch("/api/equipamentos");
    const equipamentos = await resposta.json();

    const lista = document.getElementById("lista-equipamentos");
    lista.innerHTML = "";

    equipamentos.forEach((eq) => {
      const item = document.createElement("li");
      item.classList.add("item-equipamento");
      item.innerHTML = `
        <strong>${eq.nome}</strong> R$ ${eq.preco}
        <button class="btn-excluir" onclick="deletarEquipamento(${eq.id})">Excluir</button>
        `;
      lista.appendChild(item);
    });
  } catch (erro) {
    console.error("Erro ao carregar equipamentos:", erro);
  }
}

// CREATE
// evento de carregamento do DOM
document.addEventListener("DOMContentLoaded", () => {
  // formulario de cadastro de equipamentos
  let formularioDeEquipamentos = document.getElementById("form-equipamento");
  // evento de submissão do formulario
  formularioDeEquipamentos.addEventListener("submit", async (e) => {
    // imperime o comportamento padrao do formulario
    e.preventDefault();
    // envia os dados do formulario
    // valor do input de nome
    const nome = formularioDeEquipamentos.elements["nome"].value.trim();
    // valor do input de imagem(url)
    const imagemUrl =
      formularioDeEquipamentos.elements["imagemUrl"].value.trim() ||
      "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png";
    // valor do input de preço
    const preco = formularioDeEquipamentos.elements["preco"].value.trim();
    // cria um objeto com os dados do formulario
    const novoEquipamento = { nome, imagemUrl, preco };

    try {
      const response = await fetch("/api/equipamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(novoEquipamento),
      });
      const dados = await response.json();
      // exibe uma mensagem de sucesso
      alert("Equipamento cadastrado com sucesso!");
      // reseta o formulario
      formularioDeEquipamentos.reset();
      // atualiza a lista de equipamentos
      carregarEquipamentos();
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Ocorreu um erro ao cadastrar o equipamento.");
    }
  });
});

// DELETE
async function deletarEquipamento(id) {
  if (!confirm("Deseja realmente excluir?")) return;

  try {
    await fetch(`/api/equipamentos/${id}`, { method: "DELETE" });
    alert("Equipamento excluído!");
    carregarEquipamentos(); // atualiza a lista
  } catch (erro) {
    console.error("Erro ao excluir:", erro);
    alert("Erro ao excluir.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  carregarEquipamentos();
});
