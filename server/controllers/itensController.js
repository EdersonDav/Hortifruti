import Itens from '../models/Itens'

const itensController = {
  listarItens: async (req, res) => {
    try {
      let itens = await Itens.find({})
      res.send(itens)
    } catch (error) {
      res.send(error)
    }
  },
  criarItem: async (req, res) => {
    const itens = new Itens({
      nome: req.body.nome,
      valor: req.body.valor,
      quantidade: req.body.quantidade,
      imagem: req.body.imagem,
    })

    try {
      const itemCriado = await itens.save()
      res.send(itemCriado)
    } catch (error) {
      res.status(400).send(error)
    }
  },
  buscarUmItem: async (req, res) => {
    let id = req.params.id;
    try {
      let umItem = await Itens.findOne({ _id: id })
      res.send(umItem)
    } catch (error) {
      res.send(error)
    }
  },
  deletarItem: async (req, res) => {
    let id = req.params.id;
    try {
      await Itens.findByIdAndDelete(id)
      res.send("Deletado")
    } catch (error) {
      res.send(error)
    }
  },
  updateItens: async (req, res) => {
    let id = req.body._id
    const itemUpdate = {
      nome: req.body.nome,
      valor: req.body.valor,
      quantidade: req.body.quantidade,
      imagem: req.body.imagem,
    }
    try {
      console.log(id, itemUpdate);
      let itemUp = await Itens.updateOne({ _id: id }, itemUpdate)
      let umItem = await Itens.findOne({ _id: id })
      res.send(umItem)
    } catch (error) {
      res.status(400).send(error)
    }
  }
}

export default itensController