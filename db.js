const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "tomhanks",
  host: "localhost",
  port: 5432,
  database: "perntodo"
});

module.exports = pool;
