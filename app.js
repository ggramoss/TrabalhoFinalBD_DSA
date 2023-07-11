const express = require('express');
const entregasRoutes = require('./routes/entregas');

const app = express();
const port = 3000;

// Middleware para permitir o uso do req.body
app.use(express.json());

// Rota base para as entregas
app.use('/entregas', entregasRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});