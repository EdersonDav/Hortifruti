document.addEventListener("DOMContentLoaded", () => {
  loadingItens();
});

const divDeItens = document.getElementById("itens")
const item = {}
let editId = ""
let edit = false

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
          <div class="nome"> ${itens.nome}</div>
          <div class="valor">R$: ${itens.valor}</div>
          <div class="quantidade"> ${itens.quantidade} un</div>
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
    loadingItens();
  });
}

const editOrCreateIten = () => {
  if (editId != "") {
    edit = true
  } else {
    edit = false
  }
  novoItemOrEditItem(edit)
}


const novoItemOrEditItem = async () => {
  let itemObj = {
    nome: nome.value,
    valor: Number(valor.value),
    quantidade: quantidade.value,
    imagem: imagem.value
  }

  let methodEditOrCreate = "POST"
  let linkFetch = "http://localhost:5000/criarItem"
  if (edit) {
    methodEditOrCreate = "PUT"
    linkFetch = "http://localhost:5000/update"
    itemObj._id = editId
  }

  const options = {
    method: methodEditOrCreate,
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(itemObj),
  };
  if (nome != "" && valor != "" && quantidade != "") {
    await fetch(linkFetch, options).then((resp) => {
    }).catch(error => {
      console.log(error);
    })
    resetFields()
    showPopup()
    loadingItens()
    editId = ""
  } else {
    alert("Verifique novamente os campos e tente outra vez");
  }
}


const showInfoItemEdit = async () => {
  await fetch(`http://localhost:5000/${editId}`).then(res => res.json())
    .then(data => {
      nome.value = data.nome
      valor.value = data.valor
      quantidade.value = data.quantidade
      imagem.value = data.imagem
    }
    )
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
  editId = ""
}