let mascotas = [
  {
    id: 'mascota-1',
    nombre: 'Firulais',
    especie: 'Perro',
    raza: 'Golden Retriever',
    edad: '3',
    nombrePropietario: 'Juan Pérez',
    numeroIdentificacionPropietario: '12345678',
    createdAt: new Date()
  },
  {
    id: 'mascota-2',
    nombre: 'Luna',
    especie: 'Gato',
    raza: 'Siamés',
    edad: '2',
    nombrePropietario: 'María Gómez',
    numeroIdentificacionPropietario: '87654321',
    createdAt: new Date(Date.now() - 86400000)
  }
];

class MascotasService {
  async getAll() {
    // Simula: SELECT * FROM mascotas ORDER BY createdAt DESC
    return [...mascotas].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async getById(id) {
    const mascota = mascotas.find(m => m.id === id);
    if (!mascota) {
      throw new Error('Mascota no encontrada');
    }
    return mascota;
  }

  async create(data) {
    const nuevaMascota = {
      id: `mascota-${Date.now()}`,
      nombre: data.nombre,
      especie: data.especie || 'Perro', // default value if not specified
      raza: data.raza || 'Mestizo',
      edad: data.edad,
      nombrePropietario: data.nombrePropietario,
      numeroIdentificacionPropietario: data.numeroIdentificacionPropietario,
      createdAt: new Date()
    };
    mascotas.push(nuevaMascota);
    return nuevaMascota;
  }

  async update(id, data) {
    const index = mascotas.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error('Mascota no encontrada');
    }
    mascotas[index] = {
      ...mascotas[index],
      nombre: data.nombre !== undefined ? data.nombre : mascotas[index].nombre,
      especie: data.especie !== undefined ? data.especie : mascotas[index].especie,
      raza: data.raza !== undefined ? data.raza : mascotas[index].raza,
      edad: data.edad !== undefined ? data.edad : mascotas[index].edad,
      nombrePropietario: data.nombrePropietario !== undefined ? data.nombrePropietario : mascotas[index].nombrePropietario,
      numeroIdentificacionPropietario: data.numeroIdentificacionPropietario !== undefined ? data.numeroIdentificacionPropietario : mascotas[index].numeroIdentificacionPropietario
    };
    return mascotas[index];
  }

  async delete(id) {
    const index = mascotas.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error('Mascota no encontrada');
    }
    const mascotaEliminada = mascotas[index];
    mascotas = mascotas.filter(m => m.id !== id);
    return mascotaEliminada;
  }
}

module.exports = new MascotasService();
