document.addEventListener("DOMContentLoaded", () => {
  loadingItens();
});

const itens = []
const divDeItens = document.getElementById("itens")

const loadingItens = () => {
  divDeItens.innerHTML = ""
  fetch('http://localhost:5000')
    .then(res => res.json())
    .then(data => {
      for (let itens of data) {
        divDeItens.innerHTML += `
        <div class="card">
          <img class="card-img" src="${itens.imagem}" alt="${itens.nome}">
          <div class="info">
            <div class="nome">Nome: ${itens.nome}</div>
            <div class="valor">R$: ${itens.valor}</div>
            <div class="quantidade">Estoque: ${itens.quantidade} un</div>
          </div>
          <div class="compra">
            <button onclick="showDivCompra('${itens._id}')" class="car"><img src="./img/supermarket.svg" alt="carrinho" ></button>
            <div class="divCompra" id="${itens._id}">
              <label class="add ">Quantidade</label>
              <input id="${itens._id}qtd" class="add inputAdd" type="number" name="qtd" id="qtd" max="${itens.quantidade}" min="1">
              <button onclick="addItem('${itens._id}')" class="add btnAdd" >Add</button>
            </div>
          </div>
        </div>
      `
      }

    })
}

const showDivCompra = (id) => {
  let div = document.getElementById(id)
  div.style.display = div.style.display == "flex" ? 'none' : 'flex'
}

const addItem = (id) => {
  let qtd = document.getElementById(`${id}qtd`).value
  if (qtd > 0) {
    fetch(`http://localhost:5000/${id}`).then(res => res.json())
      .then(data => {
        itens.push({
          nome: data.nome,
          valor: data.valor,
          quantidade: document.getElementById(`${id}qtd`).value
        })
      })
  }

  console.log(itens);
}


const finalizarCompra = () => {
  if (itens.length > 0) {
    let valorFinal = 0
    let quantidadeFinal = 0
    let fecharConta = document.querySelector(".fecharConta")
    itens.forEach(item => {
      valorFinal += item.valor * item.quantidade
      quantidadeFinal += item.quantidade
      fecharConta.innerHTML += `
    <div class="form">
      <div>
        <span>Nome: ${item.nome}</span>
      </div>
      <div>
        <span>Quantidade: ${item.quantidade}</span>
      </div>
      <div>
        <span>Valor unitário: ${item.valor}</span>
      </div>
      <div>
        <span>Valor Total: ${item.valor * item.quantidade}</span>
      </div>
    </div>`

    });
    fecharConta.innerHTML += `
    <div class="total">
      <span>Quantidade de itens: ${quantidadeFinal}</span>
      <span>Valor Final: ${valorFinal}</span>
    </div>
    `
  }
  else {
    alert("Nenhum item adicionado ao carrinho")
  }
}