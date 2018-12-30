module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'jwt secret',
  db: {
    database: process.env.DB_NAME || 'taptracker',
    user: process.env.DB_USER || 'taptracker',
    password: process.env.DB_PASS || 'taptracker',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './taptracker.db'
    }
  }
}
