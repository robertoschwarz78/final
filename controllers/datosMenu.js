//la info va a venir de una Base de Datos
//por ahora la tengo cargada en datos.txt

const allStudents=(req,res)=>{

   // res.status(200) -> valor por defecto, le respondo un estado OK
   //formato ? json
   let infoJSON=JSON.stringify(students)//alterando students para que se envie en formato JSON
   console.log("llamado a get")
   res.send(infoJSON)
};

const addOneStudent =(req,res)=>{

// tomar la info que le llega y guardarla en mi variable "students"
//la info nos llegamo por medio de req.body -> dentro nombre
    const {nombre}=req.body// de toda la info del formulario, solo me estoy guardando en una variable "nombre" , el valor del input de name "nombre"

    console.log(nombre)
    students.push({nombre:nombre})

//responder algo ..  salio todo ok -> rediriga a una peticion del front .
// res.send(" nombre del estudiante recibido")
    res.redirect("http://localhost:3000/")
    //res.status(200).massege("sdhfkjshd") .send(mandarDatos) .redirect()
};


module.exports={allStudents,addOneStudent}


