const express = require('express');
const router = express.Router();
const propietariosController = require('../controllers/propietarios.controller');

router.get('/', propietariosController.getAll);
router.get('/:id', propietariosController.getById);
router.post('/', propietariosController.create);
router.put('/:id', propietariosController.update);
router.delete('/:id', propietariosController.delete);

module.exports = router;
