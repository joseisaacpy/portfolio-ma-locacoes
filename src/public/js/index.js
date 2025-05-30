// container de equipamentos
let containerEquipamentos = document.querySelector(".container-equipamentos");

// função assincrona para consumir a api
async function consumoApi() {
  // request
  const req = await fetch("/api/equipamentos");

  // response em json
  const data = await req.json();

  // para cada equipamento na lista, cria um item
  data.forEach((equipamento) => {
    let item = document.createElement("div");
    item.classList.add("item-equipamento");
    item.innerHTML = `
    <img src="${equipamento.imagemUrl}" alt="${equipamento.nome}">
    <h3>${equipamento.nome}</h3>
    <p>${equipamento.preco}</p>
    <a href="https://api.whatsapp.com/send?phone=558674001151&text=Olá,%20tenho%20interesse%20em%20alugar%20o%20produto%20${encodeURIComponent(
      equipamento.nome
    )}!"
      target="_blank"
      class="btn-whatsapp"
    >
      Solicitar Orçamento
    </a>
  `;
    // adiciona o item ao container
    containerEquipamentos.appendChild(item);
  });
}
// chama a funcao
consumoApi();
