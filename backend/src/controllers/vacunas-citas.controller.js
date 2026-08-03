const vacunasCitasService = require('../services/vacunas-citas.service');

class VacunasCitasController {
  async getAll(req, res) {
    try {
      const result = await vacunasCitasService.getAll();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const result = await vacunasCitasService.getById(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { nombreMascota, nombrePropietario, numeroIdentificacionPropietario, vacunaOCita, fecha } = req.body;
      if (!nombreMascota || !nombrePropietario || !numeroIdentificacionPropietario || !vacunaOCita || !fecha) {
        return res.status(400).json({ error: 'Todos los campos son requeridos: nombreMascota, nombrePropietario, numeroIdentificacionPropietario, vacunaOCita, fecha' });
      }
      const result = await vacunasCitasService.create({ nombreMascota, nombrePropietario, numeroIdentificacionPropietario, vacunaOCita, fecha });
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const result = await vacunasCitasService.update(req.params.id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await vacunasCitasService.delete(req.params.id);
      return res.status(200).json({
        message: 'Registro eliminado correctamente',
        registro: result
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new VacunasCitasController();
