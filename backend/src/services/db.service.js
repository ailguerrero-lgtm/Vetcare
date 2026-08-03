const { Pool } = require('pg');
const { config, isPostgresEnabled } = require('../config/db.config');

class DbService {
  constructor() {
    this.pool = null;
  }

  getPool() {
    if (!isPostgresEnabled) {
      return null;
    }

    if (!this.pool) {
      this.pool = new Pool({
        host: config.host,
        port: config.portDb,
        database: config.database,
        user: config.user,
        password: config.password,
        ssl: config.ssl ? { rejectUnauthorized: false } : false
      });
    }

    return this.pool;
  }

  getStatus() {
    return {
      enabled: isPostgresEnabled,
      host: config.host,
      port: config.portDb,
      database: config.database,
      user: config.user,
      ssl: config.ssl,
      mode: isPostgresEnabled ? 'postgres' : 'mock'
    };
  }

  async testConnection() {
    if (!isPostgresEnabled) {
      return {
        ok: false,
        message: 'PostgreSQL está deshabilitado. Activa DB_ENABLED=true en .env para usar conexión real.'
      };
    }

    const pool = this.getPool();
    if (!pool) {
      return {
        ok: false,
        message: 'Pool de PostgreSQL no disponible.'
      };
    }

    try {
      const result = await pool.query('SELECT NOW()');
      return {
        ok: true,
        message: 'Conexión con PostgreSQL lista.',
        timestamp: result.rows[0]?.now
      };
    } catch (error) {
      return {
        ok: false,
        message: error.message
      };
    }
  }

  async query(text, params = []) {
    if (!isPostgresEnabled) {
      throw new Error('PostgreSQL no está habilitado. Requiere DB_ENABLED=true en .env.');
    }

    const pool = this.getPool();
    if (!pool) {
      throw new Error('Pool de PostgreSQL no disponible.');
    }

    return pool.query(text, params);
  }

  async close() {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
    }
  }
}

module.exports = new DbService();
