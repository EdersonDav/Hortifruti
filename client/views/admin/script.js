document.addEventListener("DOMContentLoaded", () => {
  loadingItens();
});

const divDeItens = document.getElementById("itens")
const item = {}
let editId = ""

let nome = document.querySelector("#nome");
let valor = document.querySelector("#valor");
let quantidade = document.querySelector("#qtd");
let imagem = document.querySelector("#url");

const loadingItens = async () => {
  divDeItens.innerHTML = ""
  await fetch('http://localhost:5000')
    .then(res => res.json())
    .then(data => {
      for (let itens of data) {
        divDeItens.innerHTML += `
        <div class="list">
          <div class="nome">Nome: ${itens.nome}</div>
          <div class="valor">R$: ${itens.valor}</div>
          <div class="quantidade">Estoque: ${itens.quantidade} un</div>
          <img class="img" src="${itens.imagem}" alt="${itens.nome}">
          <div>
            <button class="edit" onclick="showPopup('${itens._id}')"> <img src="../../img/edit.svg" alt="deletar"> </button>
            <button class="delete" onclick="deletarItem('${itens._id}')"> <img src="../../img/bin.svg" alt="deletar"> </button>
          </div>
        </div>
      `
      }

    }).catch(error => {
      console.log(error);
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

const editOrCreateIten = () => {
  if (editId != "") {
    editItem()
  } else {
    novoItem()
  }
}


const novoItem = () => {
  let nome = nome.value;
  let valor = Number(valor.value);
  let quantidade = quantidade.value;
  let imagem = imagem.value;
  let item = { nome, valor, quantidade, imagem };
  const options = {
    method: "POST",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(item),
  };
  if (nome != "" && valor != "" && quantidade != "") {
    fetch("http://localhost:5000/criarItem", options).then((resp) => {
      console.log(resp);
    });
    setTimeout(function () {
      window.location.href = "../admin/admin.html";
    }, 5000);
    showPopup()
  } else {
    alert("Verifique novamente os campos e tente outra vez");
  }
}

const showInfoItemEdit = async () => {
  const itemEdit = {}
  await fetch(`http://localhost:5000/${editId}`).then(res => res.json())
    .then(data => {
      itemEdit.nome = data.nome
      itemEdit.valor = data.valor
      itemEdit.quantidade = data.valor
      itemEdit.imagem = data.imagem
    }
    )
  nome.value = itemEdit.nome
  valor.value = itemEdit.valor
  quantidade.value = itemEdit.quantidade
  imagem.value = itemEdit.imagem
}

const showPopup = (id = "") => {
  const popup = document.querySelector(".popUp")
  popup.style.display = popup.style.display == "none" ? "flex" : "none"
  editId = id
  if (id != "") {
    showInfoItemEdit()
  } else {
    resetFields()
  }
}

const resetFields = () => {
  nome.value = ""
  valor.value = ""
  quantidade.value = ""
  imagem.value = ""
}