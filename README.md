# Sistema de Vendas 

Projeto fullstack de um sistema de vendas com:

* Frontend: React (Vite)
* Backend: Node.js + Express
* Banco: PostgreSQL + Prisma
* Docker 

---

## Como rodar o projeto

### 1. Clonar repositório

```bash
git clone https://github.com/douglas-emeefe/mf-vendas.git
cd mf-vendas
```

---

### 2. Subir banco com Docker

```bash
docker-compose up -d
```

---

### 3. Rodar backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

Backend: http://localhost:3001

---

### 4. Rodar frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173

---

## Funcionalidades (em desenvolvimento)

* Cadastro de usuários
* Cadastro de produtos
* Cadastro de clientes
* Controle de estoque
* PDV (ponto de venda)
* Relatórios (diário, mensal, anual)

---

## Tecnologias

* React
* Node.js
* Express
* Prisma
* PostgreSQL
* Docker
