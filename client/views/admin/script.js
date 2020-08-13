document.addEventListener("DOMContentLoaded", () => {
  loadingItens();
});

const divDeItens = document.getElementById("itens")

const loadingItens = () => {
  divDeItens.innerHTML = ""
  fetch('http://localhost:5000')
    .then(res => res.json())
    .then(data => {
      for (let itens of data) {
        divDeItens.innerHTML += `
        <div class="list">
          <div class="nome">Nome: ${itens.nome}</div>
          <div class="valor">R$: ${itens.valor}</div>
          <div class="quantidade">Estoque: ${itens.quantidade} un</div>
          <img class="img" src="${itens.imagem}" alt="${itens.nome}">
          <button class="delete" onclick="deletarItem('${itens._id}')"> <img src="../../img/bin.svg" alt="deletar"> </button>
        </div>
      `
      }

    })
}

const deletarItem = (id) => {
  let item = id;
  const options = {
    method: "DELETE",
    headers: new Headers({ "content-type": "application/json" })
  };
  fetch(`http://localhost:5000/${item}`, options).then((resp) => {
    console.log(resp);
    loadingItens();
  });
}


