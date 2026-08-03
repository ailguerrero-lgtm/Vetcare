const express = require('express');
const router = express.Router();
const vacunasCitasController = require('../controllers/vacunas-citas.controller');

router.get('/', vacunasCitasController.getAll);
router.get('/:id', vacunasCitasController.getById);
router.post('/', vacunasCitasController.create);
router.put('/:id', vacunasCitasController.update);
router.delete('/:id', vacunasCitasController.delete);

module.exports = router;
