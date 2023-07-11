const express = require('express');
const entregasController = require('../controllers/entregasController');

const router = express.Router();

router.post('/', entregasController.inserir);
router.get('/', entregasController.listar);
router.get('/:id', entregasController.buscarPorId);
router.put('/:id', entregasController.atualizar);
router.delete('/:id', entregasController.deletar);

module.exports = router;