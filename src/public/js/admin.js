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
    const nome = formularioDeEquipamentos.elements["nome"].value;
    // valor do input de imagem(url)
    const imagemUrl = formularioDeEquipamentos.elements["imagem"].value;
    // valor do input de preço
    const preco = formularioDeEquipamentos.elements["preco"].value;
    // cria um objeto com os dados do formulario
    const novoEquipamento = { nome, imagemUrl, preco };

    try {
      const response = await fetch("/api/equipamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoEquipamento),
      });
      const dados = await response.json();
      // exibe uma mensagem de sucesso
      alert("Equipamento cadastrado com sucesso!");
      // reseta o formulario
      formularioDeEquipamentos.reset();
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Ocorreu um erro ao cadastrar o equipamento.");
    }
  });
});
