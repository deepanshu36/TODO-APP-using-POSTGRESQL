const pg=require('pg');

const pool= new pg.Pool({
    user:"postgres",
    host:"localhost",
    database:"test",
    password:"rx",
    port: 5432,
})
module.exports=pool;
