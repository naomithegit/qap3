// Description: Database connection 
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'agathasgoodeats',
  password: 'passwordforcookies123!',
  port: 5432
});

module.exports = pool;  

