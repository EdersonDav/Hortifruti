document.addEventListener("DOMContentLoaded", () => {
  loadingItens();
});

let itens = []
const divDeItens = document.getElementById("itens")
let fecharConta = document.querySelector(".fecharConta")

const loadingItens = () => {
  itens = []
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
              <div>
                <button onclick="addItem('${itens._id}', this)" class="add btnAdd" >Add</button>
                <button onclick="cancelItem('${itens._id}', this)" class="btnCancel" >Cancelar</button>
              </div>
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

const addItem = (id, e) => {
  let qtd = document.getElementById(`${id}qtd`).value
  if (qtd > 0) {
    fetch(`http://localhost:5000/${id}`).then(res => res.json())
      .then(data => {
        itens.push({
          id: data._id,
          nome: data.nome,
          valor: data.valor,
          quantidade: document.getElementById(`${id}qtd`).value
        })
      })
  }
  e.style.display = "none"
  e.nextElementSibling.style.display = "flex"
}

const cancelItem = (id, e) => {
  document.getElementById(`${id}qtd`).value = ""
  showDivCompra(id)
  console.log(itens);
  let newItens = []
  itens.map(item => {
    if (item.id != id) {
      newItens.push(item)
    }
    return newItens
  })

  itens = newItens
  console.log(itens);

  e.style.display = "none"
  e.previousElementSibling.style.display = "flex"
}


const finalizarCompra = () => {
  if (itens.length > 0) {
    let valorFinal = 0
    let quantidadeFinal = 0
    let itensFecharconta = document.querySelector(".tb")
    itensFecharconta.innerHTML = `
    <div class="th">
          <span>Nome</span>
          <span>Quantidade</span>
          <span>Valor unitário</span>
          <span>Valor Total</span>
        </div>`
    fecharConta.style.display = "flex"
    itens.forEach(item => {
      valorFinal += item.valor * item.quantidade
      quantidadeFinal += Number(item.quantidade)
      itensFecharconta.innerHTML += `
          <div class="td">
            <span>${item.nome}</span>
            <span>${item.quantidade}</span>
            <span>${item.valor}</span>
            <span>${item.valor * item.quantidade}</span>
          </div>`

    });
    document.getElementById("qtdFinal").innerText = quantidadeFinal
    document.getElementById("valFinal").innerText = valorFinal
  }
  else {
    alert("Nenhum item adicionado ao carrinho")
  }
}

const cancelCompra = () => {
  fecharConta.style.display = "none"
  loadingItens()
}

const pagarCompra = () => {
  itens.forEach(async item => {
    let itemComprado = {}
    await fetch(`http://localhost:5000/${item.id}`).then(res => res.json())
      .then(data => {
        itemComprado = {
          _id: item.id,
          nome: data.nome,
          valor: data.valor,
          quantidade: data.quantidade - item.quantidade,
          imagem: data.imagem
        }
      })
    const options = {
      method: "PUT",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(itemComprado),
    };
    await fetch("http://localhost:5000/update", options).then((resp) => {
      console.log(itemComprado);
    }).catch(error => {
      console.log(error);
    })
  })

  setTimeout(() => {
    fecharConta.style.display = "none"
    loadingItens()
  }, 1000)
}
// const itemComprado = async (id) => {
//   let itemComprado = []
//   await fetch(`http://localhost:5000/${id}`).then(res => res.json())
//     .then(data => {
//       itemComprado.nome = data.nome
//       itemComprado.valor = data.valor
//       itemComprado.quantidade = data.quantidade
//       itemComprado.imagem = data.imagem
//     }
//     )
//   console.log(itemComprado);
//   return itemComprado
// }