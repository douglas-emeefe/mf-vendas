import { Router } from "express";
import * as usuarioController from "../controllers/usuarioController.js";

const router = Router();

router.post("/", usuarioController.criar);
router.get("/", usuarioController.listar);
router.delete("/:id", usuarioController.deletar);

export default router;