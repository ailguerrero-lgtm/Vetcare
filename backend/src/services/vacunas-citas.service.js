let vacunasCitas = [
  {
    id: 'registro-1',
    nombreMascota: 'Firulais',
    nombrePropietario: 'Juan Pérez',
    numeroIdentificacionPropietario: '12345678',
    vacunaOCita: 'Vacuna Rabia',
    fecha: '2026-08-15'
  },
  {
    id: 'registro-2',
    nombreMascota: 'Luna',
    nombrePropietario: 'María Gómez',
    numeroIdentificacionPropietario: '87654321',
    vacunaOCita: 'Desparasitación',
    fecha: '2026-08-20'
  }
];

class VacunasCitasService {
  async getAll() {
    // Simula: SELECT * FROM vacunas_citas
    return [...vacunasCitas];
  }

  async getById(id) {
    const registro = vacunasCitas.find(rc => rc.id === id);
    if (!registro) {
      throw new Error('Registro no encontrado');
    }
    return registro;
  }

  async create(data) {
    const nuevoRegistro = {
      id: `registro-${Date.now()}`,
      nombreMascota: data.nombreMascota,
      nombrePropietario: data.nombrePropietario,
      numeroIdentificacionPropietario: data.numeroIdentificacionPropietario,
      vacunaOCita: data.vacunaOCita,
      fecha: data.fecha
    };
    vacunasCitas.push(nuevoRegistro);
    return nuevoRegistro;
  }

  async update(id, data) {
    const index = vacunasCitas.findIndex(rc => rc.id === id);
    if (index === -1) {
      throw new Error('Registro no encontrado');
    }
    vacunasCitas[index] = {
      ...vacunasCitas[index],
      nombreMascota: data.nombreMascota !== undefined ? data.nombreMascota : vacunasCitas[index].nombreMascota,
      nombrePropietario: data.nombrePropietario !== undefined ? data.nombrePropietario : vacunasCitas[index].nombrePropietario,
      numeroIdentificacionPropietario: data.numeroIdentificacionPropietario !== undefined ? data.numeroIdentificacionPropietario : vacunasCitas[index].numeroIdentificacionPropietario,
      vacunaOCita: data.vacunaOCita !== undefined ? data.vacunaOCita : vacunasCitas[index].vacunaOCita,
      fecha: data.fecha !== undefined ? data.fecha : vacunasCitas[index].fecha
    };
    return vacunasCitas[index];
  }

  async delete(id) {
    const index = vacunasCitas.findIndex(rc => rc.id === id);
    if (index === -1) {
      throw new Error('Registro no encontrado');
    }
    const registroEliminado = vacunasCitas[index];
    vacunasCitas = vacunasCitas.filter(rc => rc.id !== id);
    return registroEliminado;
  }
}

module.exports = new VacunasCitasService();
