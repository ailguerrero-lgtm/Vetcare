// Almacenamiento temporal de usuarios en memoria (Mock Database)
const usuarios = [
  {
    id: 1,
    nombre: 'Usuario de Prueba',
    email: 'kirito11051913@gmail.com',
    password: '123456' // En producción esta contraseña debe estar hasheada (ej. con bcrypt)
  }
];

class AuthService {
  async login(email, password) {
    // Simula una consulta SELECT * FROM usuarios WHERE email = $1
    const usuario = usuarios.find(u => u.email === email.toLowerCase());

    if (!usuario) {
      const error = new Error('Usuario no encontrado 🧐');
      error.code = 'user-not-found';
      throw error;
    }

    if (usuario.password !== password) {
      const error = new Error('Contraseña incorrecta ❌');
      error.code = 'wrong-password';
      throw error;
    }

    // Retorna los datos del usuario y un token de sesión simulado
    return {
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
      },
      token: `simulated-jwt-token-${usuario.id}`
    };
  }

  async register(nombre, email, password) {
    // Simula una consulta para verificar existencia
    const existe = usuarios.some(u => u.email === email.toLowerCase());
    if (existe) {
      const error = new Error('El correo ya está en uso 📧');
      error.code = 'email-already-in-use';
      throw error;
    }

    const nuevoUsuario = {
      id: usuarios.length + 1,
      nombre,
      email: email.toLowerCase(),
      password
    };

    usuarios.push(nuevoUsuario);

    return {
      id: nuevoUsuario.id,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email
    };
  }

  async sendPasswordResetEmail(email) {
    const usuario = usuarios.find(u => u.email === email.toLowerCase());
    if (!usuario) {
      const error = new Error('No existe una cuenta con ese correo.');
      error.code = 'user-not-found';
      throw error;
    }
    // Simula el envío de un correo de restablecimiento
    return {
      success: true,
      message: `Enlace de recuperación enviado a ${email} 📩`
    };
  }
}

module.exports = new AuthService();
