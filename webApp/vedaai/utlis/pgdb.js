import { Pool } from 'pg';


const pool = new Pool({
    user: process.env.PG_USER || 'postgres',
    host: process.env.PG_HOST || 'localhost',
    database: process.env.PG_DATABASE || 'vedaai',
    password: process.env.PG_PASSWORD || '1234',
    port: process.env.PG_PORT || 5432,
  });


  export default pool;