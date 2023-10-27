import {Router} from "express"
import Usuario from "../models/Usuario.js";
import authMiddleware from "../middleware/auth.js";
import jwt from 'jsonwebtoken';
import authJWT from "../middleware/jwt.js";
const routerBD = Router();

routerBD.get("/hello", function(req,res){
    res.json({"Hola": "Mundo"})
})
/*
router.use((req,res,next)=>{
    if(req.query.password == "req.body.name"){
        next()
    else{
        res.send("No tienes acceso")
    }

    console.log(`Entro al middleware desde: ${req.method} ${req.ip}`)
})*/

//router.use(authMiddleware)

/*
routerBD.get("/goodbye",authJWT, function(req,res){
    res.json({"adios": "Mundo"})
})
*/

routerBD.get('/getAll',authJWT,async function(req, res){
    try {
        const result = await Usuario.find()
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

routerBD.get('/all', async function(req, res){
    try {
        const result = await Usuario.find()
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

routerBD.post('/registro', async function(req, res){
    const usuario = new Usuario({
        name: req.body.name,
        pass: req.body.pass,
        contacts: req.body.contacts,
        proyects: req.body.proyects,
        skills: req.body.skills,
    });

    try {
        const guardar = await usuario.save();
        res.status(200).json(guardar)
    } catch (error) {
        res.status(500).json(req.body)
    }
})

routerBD.post('/login',async function(req,res){
    const name = req.body.name
    const pass = req.body.pass

    try {
        let objetoJWT = {
            name,
            pass
        }

        jwt.sign(objetoJWT,name,(err,token)=>{
            if(err){
                res.status(500).json({msg:err})
                return;
            }else{
                res.status(200).json({msg:"Token Creado",token:token})
                return
            }
        });
        
        //res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

})

export default routerBD;