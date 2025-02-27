const { Pool } = require('pg');
 const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecommerce-kecil',
  password: 'putu2520',
  port: 5432,
 })

 module.exports = pool;