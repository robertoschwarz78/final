const express=require('express');
const { allStudents, addOneStudent } = require('./controllers/datosMenu.js');
const cors =require('cors');
const app= express();
const port=4001;

app.use(express.json());
app.use(cors());// por si el navegador nos tira un error porque estamos queriendo consumir de un dominio a otro 
app.use(express.urlencoded({extended:true}))//para poder recibir la info de un formulario en formato de objeto 


app.get('/getStudents',allStudents);//peticion get que me traer a todos los estudiantes


app.post('/addStudent',addOneStudent);
//http://localhost:4001/addStudent

app.listen(port,()=>{
    console.log("Escuchando por el puerto "+port)
});
// pedir los alumnos -> get
// agregar alumnos a la lista   -> post