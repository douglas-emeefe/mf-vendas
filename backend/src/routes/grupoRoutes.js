import { Router } from "express";
import * as grupoController from "../controllers/grupoController.js";

const router = Router();

router.post("/", grupoController.criar);
router.get("/", grupoController.listar);
router.delete("/:id", grupoController.deletar);

export default router;