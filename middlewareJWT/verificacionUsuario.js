require('dotenv').config();
const jwt=require("jsonwebtoken");

const verificacionUsuario=(req,res,next)=>{
    //tomar el token que nos trae la request y verificar si es la correcta;
    const authToken=req.headers.authorization;
    const token=authToken.split(" ").pop();//tomando al valor que viene en el header , separandolo y tomando solamente el token sin la plabra "Bearer"
    //console.log(token);
    //next()continua con el resto del camino (otros middlewares o el controller, lo que este luego de la funcion en el router)
    //con eso, vamos a permitirle que continue con las demas instancias del router: cargar la imagen y cargar la info a la db.
    jwt.verify(token,process.env.PASS_SEGURA,(error,data)=>{
        if(error){
            if(error.name == "TokenExpiredError"){return res.send("Expiro el tiempo, por favor volver a logearse")}
            res.send(error)
        }else{
            console.log(data);//en esta data esta el payload que cargamos en el login cuando se creo el token
            req.auth=data.nombreUsuario;
            next()
        }
    });
};


module.exports={verificacionUsuario}