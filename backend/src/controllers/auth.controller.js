const authService = require('../services/auth.service');

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Por favor completa todos los campos ⚠️' });
      }

      const result = await authService.login(email, password);
      return res.status(200).json(result);
    } catch (error) {
      // Devolvemos el código de error correspondiente para que el frontend lo procese igual que Firebase Auth
      return res.status(400).json({
        code: error.code || 'auth-error',
        message: error.message
      });
    }
  }

  async register(req, res) {
    try {
      const { nombre, email, password } = req.body;
      if (!email || !password || !nombre) {
        return res.status(400).json({ error: 'Por favor completa todos los campos ⚠️' });
      }

      const result = await authService.register(nombre, email, password);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({
        code: error.code || 'registration-error',
        message: error.message
      });
    }
  }

  async recover(req, res) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: 'Por favor ingresa tu correo electrónico ⚠️' });
      }

      const result = await authService.sendPasswordResetEmail(email);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        code: error.code || 'recovery-error',
        message: error.message
      });
    }
  }
}

module.exports = new AuthController();
