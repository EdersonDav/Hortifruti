import mongoose from 'mongoose'

const itensSchema = mongoose.Schema({
  nome: { type: String, required: true, minlength: 3, maxlength: 50 },
  valor: { type: Number, required: true },
  quantidade: { type: Number, required: true },
  imagem: { type: String, required: false }
})

export default mongoose.model("Itens", itensSchema)