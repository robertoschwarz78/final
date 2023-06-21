const mysql= require('mysql2'); // para que funcionen las consultas SQL
require('dotenv').config(); // para que funcionen las consultas SQL

const dbInfo={
    host: process.env.HOST,
    port: process.env.PORT, // tambien funciona sin poner el puerto
    user: process.env.DB_USER,
    password: process.env.PASS_SEGURA,
    database: process.env.DB
};

const dbConection=mysql.createConnection(dbInfo);

dbConection.connect((error)=>{
    if(error){
        if(error.code =='ER_BAD_DB_ERROR'){
            return ({codigo:504, mensaje:error.sqlMessage})
        }else{
            console.log(error)
        }
    }else{
        console.log("Servidor conectado a DB SQL")
    }
    // queda conectado al servidor, luego de un rato genera error?
    // comando dbConection.end()
});

module.exports=dbConection;
