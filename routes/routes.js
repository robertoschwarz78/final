const express= require('express');
const router=express.Router();
const {menu_completo, menu_parcial, menu_item, agregarItem, modificarItem, eliminarItem} = require('../controllers/controllersMenu.js');

const {login, registrarUsuario}=require('../controllers/controllersUsuarios.js');
const {verificacionUsuario} = require('../middlewareJWT/verificacionUsuario.js');


router.get("/menu/", menu_completo); // trae todo el menu
router.get("/menu/:cat", menu_parcial); // trae el menu filtrado por categoria

router.get("/item/:cod", menu_item); // trae todo el menu

router.post("/agregar", agregarItem) //agrega itam al menu

router.put("/modificar", modificarItem) //agrega itam al menu

router.delete("/eliminar", eliminarItem) //agrega itam al menu


//para logear a un usuario ya registrado
router.post('/login', login);

//registrar un usuario nuevo
router.post('/nuevoUsuario', registrarUsuario);

module.exports=router;
