require('dotenv').config()
const express= require('express');
const app=express();
const puerto=4000;

const cors=require('cors');
const routes=require('./routes/routes.js');

console.log("Iniciando servidor")

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }))
app.use('',routes);


app.listen(puerto,()=>{
    console.log("Servidor corriendo en puerto local " + puerto)
})
