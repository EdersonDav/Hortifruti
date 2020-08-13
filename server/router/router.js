import express from "express";
import controller from "../controllers/itensController";
const router = express.Router();

router.post("/criarItem", controller.criarItem);
router.get('/:id', controller.buscarUmItem)
router.delete('/:id', controller.deletarItem)
router.get('/', controller.listarItens)
export default router;