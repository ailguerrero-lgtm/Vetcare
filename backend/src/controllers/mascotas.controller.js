const mascotasService = require('../services/mascotas.service');

class MascotasController {
  async getAll(req, res) {
    try {
      const result = await mascotasService.getAll();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const result = await mascotasService.getById(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { nombre, especie, raza, edad, nombrePropietario, numeroIdentificacionPropietario } = req.body;
      if (!nombre || !edad || !nombrePropietario || !numeroIdentificacionPropietario) {
        return res.status(400).json({ error: 'El nombre, la edad, el nombre del propietario y el número de identificación son requeridos' });
      }
      const result = await mascotasService.create({ nombre, especie, raza, edad, nombrePropietario, numeroIdentificacionPropietario });
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const result = await mascotasService.update(req.params.id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await mascotasService.delete(req.params.id);
      return res.status(200).json({
        message: 'Mascota eliminada correctamente',
        mascota: result
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new MascotasController();
