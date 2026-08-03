const propietariosService = require('../services/propietarios.service');

class PropietariosController {
  async getAll(req, res) {
    try {
      const result = await propietariosService.getAll();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const result = await propietariosService.getById(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { nombre, telefono, direccion } = req.body;
      if (!nombre || !telefono || !direccion) {
        return res.status(400).json({ error: 'Todos los campos son requeridos: nombre, telefono, direccion' });
      }
      const result = await propietariosService.create({ nombre, telefono, direccion });
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const result = await propietariosService.update(req.params.id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await propietariosService.delete(req.params.id);
      return res.status(200).json({
        message: 'Propietario eliminado correctamente',
        propietario: result
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new PropietariosController();
