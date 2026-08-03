const dotenv = require('dotenv');
dotenv.config();

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3000),
  dbEnabled: process.env.DB_ENABLED === 'true',
  host: process.env.DB_HOST || 'localhost',
  portDb: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || 'vetcare',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  ssl: process.env.DB_SSL === 'true',
  jwtSecret: process.env.JWT_SECRET || 'change-me',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:4200'
};

module.exports = {
  config,
  isPostgresEnabled: config.dbEnabled
};
