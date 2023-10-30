module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "hejsan123",
  DB: "testdb8",
  PGPORT: 5432,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};