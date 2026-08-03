let propietarios = [
  {
    id: 'propietario-1',
    nombre: 'Juan Pérez',
    telefono: '555-0199',
    direccion: 'Av. Principal 123'
  },
  {
    id: 'propietario-2',
    nombre: 'María Gómez',
    telefono: '555-0244',
    direccion: 'Calle Flores 456'
  }
];

class PropietariosService {
  async getAll() {
    // Simula: SELECT * FROM propietarios
    return [...propietarios];
  }

  async getById(id) {
    const propietario = propietarios.find(p => p.id === id);
    if (!propietario) {
      throw new Error('Propietario no encontrado');
    }
    return propietario;
  }

  async create(data) {
    const nuevoPropietario = {
      id: `propietario-${Date.now()}`,
      nombre: data.nombre,
      telefono: data.telefono,
      direccion: data.direccion
    };
    propietarios.push(nuevoPropietario);
    return nuevoPropietario;
  }

  async update(id, data) {
    const index = propietarios.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Propietario no encontrado');
    }
    propietarios[index] = {
      ...propietarios[index],
      nombre: data.nombre !== undefined ? data.nombre : propietarios[index].nombre,
      telefono: data.telefono !== undefined ? data.telefono : propietarios[index].telefono,
      direccion: data.direccion !== undefined ? data.direccion : propietarios[index].direccion
    };
    return propietarios[index];
  }

  async delete(id) {
    const index = propietarios.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Propietario no encontrado');
    }
    const propietarioEliminado = propietarios[index];
    propietarios = propietarios.filter(p => p.id !== id);
    return propietarioEliminado;
  }
}

module.exports = new PropietariosService();
