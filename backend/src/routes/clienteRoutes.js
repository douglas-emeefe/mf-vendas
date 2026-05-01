import { Router } from "express";
import * as clienteController from "../controllers/clienteController.js";

const router = Router();

router.post("/", clienteController.criar);
router.get("/", clienteController.listar);
router.delete("/:id", clienteController.deletar);
router.put("/:id", clienteController.atualizar);

export default router;