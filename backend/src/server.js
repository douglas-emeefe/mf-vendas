import express from "express";
import cors from "cors";
import produtoRoutes from "./routes/produtoRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import grupoRoutes from "./routes/grupoRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/produtos", produtoRoutes);
app.use("/clientes", clienteRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/grupos", grupoRoutes);

app.get("/", (req, res) => {
  res.send("API Sistema de Vendas rodando!");
});

app.listen(3001, () => {
  console.log("Servidor rodando em http://localhost:3001");
});