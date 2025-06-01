let containerEquipamentos = document.querySelector(".container-equipamentos");

async function consumoApi() {
  try {
    const req = await fetch("/api/equipamentos");
    const data = await req.json();

    // se não houver equipamentos, mostra mensagem
    if (data.length === 0) {
      let textoSemEquipamentos = document.createElement("h3");
      textoSemEquipamentos.textContent = "Nenhum equipamento cadastrado.";
      containerEquipamentos.appendChild(textoSemEquipamentos);
      return;
    }

    // se houver, renderiza todos
    data.forEach((equipamento) => {
      let item = document.createElement("div");
      item.classList.add("item-equipamento");
      item.innerHTML = `
        <img src="${equipamento.imagemUrl}" alt="${equipamento.nome}">
        <h3>${equipamento.nome}</h3>
        <p>Valor: R$${equipamento.preco}</p>
        <a href="https://api.whatsapp.com/send?phone=558674001151&text=Olá,%20tenho%20interesse%20em%20alugar%20o%20produto%20${encodeURIComponent(
          equipamento.nome
        )}!" target="_blank" class="btn-whatsapp">
          Solicitar Orçamento
        </a>
      `;
      containerEquipamentos.appendChild(item);
    });
  } catch (erro) {
    console.error("Erro ao consumir a API:", erro);
    containerEquipamentos.innerHTML =
      "<p style='color:red;'>Erro ao carregar os equipamentos. Tente novamente mais tarde.</p>";
  }
}

consumoApi();
