function novoItem() {
  let nome = document.querySelector("#nome").value;
  let valor = Number(document.querySelector("#valor").value);
  let quantidade = document.querySelector("#qtd").value;
  let imagem = document.querySelector("#url").value;
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
  } else {
    alert("Verifique novamente os campos e tente outra vez");
  }
}