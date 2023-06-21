require('dotenv').config();
const dbConection=require('../config/database');
const passSeg=process.env.PASS_SEGURA;
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');


const login=(req,res)=>{
    //verificar si el usuario esta registrado
    const{user,password}=req.body;
    //traigo la info de la db

  //* ----------------------------------------------- Ejemplo utilizando SQL */
    dbConection.query("SELECT * FROM usuarios WHERE nombreUsuario=?",[user],async(err,data)=>{
        if(err){
            res.send("Error en el servidor "+ err)
        }else{
            //si la peticion es correcta pero no me trae nada de info porque no existe un usuario con ese nombre
            if(data.length == 0){
              return  res.status(204).json("usuario no registrado")
            }

            //Si ubica al usuario
            let info= data[0];

            //BCRYPT
            // como la contraseña de la DB esta encriptada , usamos el metodo compare para que se fije si coincide con la que le pasamos del front.
            const passwordOk=await bcrypt.compare(password,info.password)//devuelve un booleano 
          
            if( passwordOk == true){
                console.log("usuario correcto, se puede generar el token")
    
                //JWT
                //generar el token para devolverlo y que pueda usarlo para cargar una pelicula
                jwt.sign({user},passSeg,{expiresIn:'30m'},(error,token)=>{
                    if(error){
                        res.send(error);
                    }else{
                        res.json({
                            message:"usuario logeado",
                            tokenLogIn:token
                        });
                    }
                })
            }else{
                res.status(401).json({message:"Password incorrecta"})
            }
        }
        

    })
};
const registrarUsuario =async(req,res)=>{
    //traemos la info del front a guardar
    const{user,password}= req.body;

    //encriptacion de la contraseña 
    const passEncriptada= await bcrypt.hash(password,10);

    //guardamos la data en la DB (dependiendo del tipo de DB el metodo):SQl -> INSERT INTO ; MongoDB ; inserOne()

    dbConection.query('INSERT INTO usuarios (nombreUsuario,password) VALUES(?,?)',[user,passEncriptada],(err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.json({
                    message:"usuario registrado",
                    password:passEncriptada
        })
        }
    });

};

module.exports={registrarUsuario,login}