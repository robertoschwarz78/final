
const dbConection=require('../config/database');


const menu_completo=(req,res)=>{
 
    let consulta = 'SELECT * FROM tabla_menu';
    console.log("consulta SQL: " + consulta);
    dbConection.query(consulta,(error,data)=>{
        if(error){
            res.status(500).json({mensaje:"problemas en la peticion del servidor"})
        } else {
            res.send(data)
            console.log("consulta exitosa")
        }
    });
};


const menu_parcial=(req,res)=>{

    let cat = req.params.cat;
    let consulta = 'SELECT * FROM tabla_menu WHERE tipo LIKE "' + cat + '"';
    console.log("consulta SQL: " + consulta);

    dbConection.query(consulta,(error,data)=>{
        if(error){
            res.status(500).json({mensaje:"problemas en la peticion del servidor"})
        } else {
            res.send(data)
            console.log("consulta exitosa")
        }
    });
};

const menu_item=(req,res)=>{

    let cod = req.params.cod;
    let consulta = 'SELECT * FROM tabla_menu WHERE codigo = ' + cod + ' LIMIT 1';
    console.log("consulta SQL: " + consulta);

    dbConection.query(consulta,(error,data)=>{
        if(error){
            res.status(500).json({mensaje:"problemas en la peticion del servidor"})
        } else {
            res.send(data)
            console.log("consulta exitosa")
        }
    });
};

const agregarItem=(req,res)=>{

    const{codigo,tipo,imagen,titulo,nota,descripcion,precio,activo}=req.body;
    let consulta = 'INSERT INTO tabla_menu (codigo,tipo,imagen,titulo,nota,descripcion,precio,activo) VALUES ("'+codigo+'","'+tipo+'","'+imagen+'","'+titulo+'","'+nota+'","'+descripcion+'","'+precio+'","'+activo+'")';
    console.log("consulta SQL: " + consulta);

    dbConection.query(consulta,(error)=>{
        if(error){
            console.log("Error: " + error);
            if(error.code == "ER_DUP_ENTRY") {
                res.status(304);
                res.send(error);
            } else {
                res.status(409);
                res.send(error);
            }
            
            console.log("Error: " + error.code);
        }else{
            res.status(202).json({mensaje:"Item cargado exitosamente"});
            console.log("Exito");
        }
    })
};

const modificarItem=(req,res)=>{

    const{codigo,tipo,imagen,titulo,nota,descripcion,precio}=req.body;
    let consulta = 'UPDATE tabla_menu SET tipo = "'+tipo+'", imagen = "'+imagen+'", titulo = "'+titulo+'", ';
    consulta = consulta + 'nota = "'+nota+'", descripcion = "'+descripcion+'", precio = "'+precio+'" WHERE codigo = '+codigo;
    console.log("consulta SQL: " + consulta);
    dbConection.query(consulta,(error,data)=>{
        if(error){
            res.status(304);
            res.send(error)
            console.log("Error: " + error);
        }else{
            res.status(201).json({mensaje:"Item cargado exitosamente"});
            console.log("Exito");
        }
    })
};

const eliminarItem=(req,res)=>{

    const {codigo}=req.body;
    let consulta = 'DELETE FROM tabla_menu WHERE codigo = ' + codigo;
    console.log("consulta SQL: " + consulta);
    dbConection.query(consulta,(error,data)=>{
        if(error){
            res.status(304);
            res.send(error)
            console.log("Error: " + error);
        }else{
            res.status(202).json({mensaje:"Item eliminado exitosamente"});
            console.log("Item " + codigo + " eliminado exitosamente");
        }
    })
};

// --------------------------------------------------------------------------

module.exports={
    menu_completo,
    menu_parcial,
    menu_item,
    agregarItem,
    modificarItem,
    eliminarItem,
}