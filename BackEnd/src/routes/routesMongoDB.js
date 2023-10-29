import {Router} from "express"
import Usuario from "../models/Usuario.js";
import Topic from "../models/Topic.js";
import Skill  from "../models/Skill.js";
import Proyect from "../models/Proyect.js";
//import authMiddleware from "../middleware/auth.js";
//import jwt from 'jsonwebtoken';
//import authJWT from "../middleware/jwt.js";
const routerBD = Router();

routerBD.get("/", function(req,res){
    res.json({"Hola": "Mundo MongoDB"})
})

routerBD.get('/Users', async function(req, res){
    try {
        const result = await Usuario.find()
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

routerBD.post('/Register', async function(req, res){

    const {name,pass,skills=[]}=req.body;

    const userduplicate=await Usuario.findOne({name:name});//verificar duplicados

        if(!userduplicate){//sin duplicar
            let usuario = new Usuario({//crear usuario
                name: name,
                pass: pass,
                contacts: [],
                proyects: [],
                skills:skills
            });

        try {
            
            const newskills= await addskills2user(name,skills);

            let guardado=await usuario.save();//guardar cambios usuario
            guardado.addnew=newskills;//agregar listado para completar
            console.log(`success add user--> ${guardado}`);
            return res.status(200).json(guardado)
        } catch (error) {
            //11000 duplicate
            if(error.code===11000){
                console.log(`ERROR-->DUPLICADO`);
            }
            console.log(`--- ${error} ---`);
            
            return res.status(500).json(error)
        }
        
    }
    else{
        const error= new Error("Duplicado")
        error.code=11000
        return res.status(500).json(error)
    }
})

routerBD.post('/User', async function(req, res){
    const {name}=req.body;

    try {
        const user=await Usuario.findOne({name:name});//verificar usuario existe
        if(user){//existe
            return res.status(200).json(user)

        }else{
            console.log(`Error Usuario no encontrado`);
            const error= new Error("Error Usuario no encontrado")
            error.code=9998
            return res.status(500).json(error)
        }
        
    } catch (error) {
        console.log(`Error`);
        return res.status(500).json(error)
    }
})

routerBD.post('/Skill', async function(req, res){
    const {ability}=req.body;

    try {
        const skill=await Skill.findOne({ability:ability});//verificar usuario existe
        if(skill){//existe
            return res.status(200).json(skill)

        }else{
            console.log(`Error Skill no encontrada`);
            const error= new Error("Error Skill no encontrada")
            error.code=9997
            return res.status(500).json(error)
        }
        
    } catch (error) {
        console.log(`Error`);
        return res.status(500).json(error)
    }
})

routerBD.post('/Proyect', async function(req, res){
    const {title}=req.body;

    try {
        const proyect=await Proyect.findOne({title:title});//verificar usuario existe
        if(proyect){//existe
            return res.status(200).json(proyect)

        }else{
            console.log(`Error proyect no encontrada`);
            const error= new Error("Error proyect no encontrada")
            error.code=9997
            return res.status(500).json(error)
        }
        
    } catch (error) {
        console.log(`Error`);
        return res.status(500).json(error)
    }
})

routerBD.get('/Skills', async function(req, res){
    try {
        const result = await Skill.find({}).distinct('ability')
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


routerBD.get('/Topics', async function(req, res){
    try {
        const result = await Proyect.find({}).distinct('topic')
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

routerBD.post('/User/Skills', async function(req, res){
    const {ability}=req.body;
    console.log(ability)
    try {
        const result = await Usuario.find({ 
            skills: { $in: ability } 
        })
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

routerBD.post('/User/Topics', async function(req, res){
    const {topic}=req.body;
    try {
        let result = await Proyect.find({ 
            topic:{ $in: topic} 
        },{"user":1,_id:0})

        result=result.map((elemennt)=>elemennt.user)
        
        result=await Usuario.find({"name": { $in: result}})
    
        return res.status(200).json(result)
        


    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})



routerBD.post('/Proyect', async function(req, res){
    const {title}=req.body;

    try {
        const proyect=await Proyect.findOne({title:title});//verificar usuario existe
        if(proyect){//existe
            return res.status(200).json(proyect)

        }else{
            console.log(`Error Proyect no encontrado`);
            const error= new Error("Error Proyect no encontrado")
            error.code=9997
            return res.status(500).json(error)
        }
        
    } catch (error) {
        console.log(`Error`);
        return res.status(500).json(error)
    }
})

routerBD.post('/User/Add/Contact', async function(req, res){

    const {name,pass,contact}=req.body;      

    try {
        const user=await Usuario.findOne({name:name});//verificar usuario existe

        if(user){//existe
            if (user.pass==pass) {
                console.log(!user.contacts.find((element) => element == contact))
                if (!user.contacts.find((element) => element == contact)) {//proyect ya contiene usuario
                    user.contacts=user.contacts.concat(contact);//update proyect
                }
                let guardado=await user.save();
                return res.status(200).json(guardado)
            }else{
                console.log(`Error contraseña`);
                const error= new Error("Error contraseña")
                error.code=9999
                return res.status(500).json(error)
            }
        }else{
            console.log(`Error Usuario no encontrado`);
            const error= new Error("Error Usuario no encontrado")
            error.code=9998
            return res.status(500).json(error)
        }
        
    } catch (error) {
        console.log(`Error`);
        return res.status(500).json(error)
    }

})

routerBD.post('/User/Del/Contact', async function(req, res){

    const {name,pass,contact=[]}=req.body;      

    try {
        const user=await Usuario.findOne({name:name});//verificar usuario existe
        if(user){//existe
            if (user.pass==pass) {                
                
                var index = user.contacts.indexOf(contact);

                if (index > -1) {//usuario contiene contacto
                    user.contacts.splice(index, 1);
                }

                let guardado=await user.save();
                return res.status(200).json(guardado)
            }else{
                console.log(`Error contraseña`);
                const error= new Error("Error contraseña")
                error.code=9999
                return res.status(500).json(error)
            }
        }else{
            console.log(`Error Usuario no encontrado`);
            const error= new Error("Error Usuario no encontrado")
            error.code=9998
            return res.status(500).json(error)
        }
        
    } catch (error) {
        console.log(`Error`);
        return res.status(500).json(error)
    }

})

/////

routerBD.post('/User/Add/Skill', async function(req, res){

    const {name,pass,skills=[]}=req.body;      

    try {
        const user=await Usuario.findOne({name:name});//verificar usuario existe
        if(user){//existe
            if (user.pass==pass) {
                const newskills= await addskills2user(name,skills);
                for (let i = 0; i < skills.length; i++) {
                    if (!user.skills.find((element) => element == skills[i])) {//skill ya contiene usuario
                        user.skills=user.skills.concat(skills[i]);//update skills
                    }          
                }

                let guardado=await user.save();
                guardado.addnew=newskills;//agregar listado para completar

                return res.status(200).json(guardado)
            }else{
                console.log(`Error contraseña`);
                const error= new Error("Error contraseña")
                error.code=9999
                return res.status(500).json(error)
            }
        }else{
            console.log(`Error Usuario no encontrado`);
            const error= new Error("Error Usuario no encontrado")
            error.code=9998
            return res.status(500).json(error)
        }
        
    } catch (error) {
        console.log(`Error`);
        return res.status(500).json(error)
    }

})

routerBD.post('/User/Del/Skill', async function(req, res){

    const {name,pass,skills=[]}=req.body;      

    try {
        const user=await Usuario.findOne({name:name});//verificar usuario existe
        if(user){//existe
            if (user.pass==pass) {
                const newskills= await delskills2user(name,skills);
                var index = -1;
                for (let i = 0; i < skills.length; i++) {
                    index = user.skills.indexOf(skills[i]);
                    if (index > -1) {//skill ya contiene usuario
                        user.skills.splice(index, 1);
                    }
                }

                let guardado=await user.save();
                guardado.addnew=newskills;//agregar listado para completar

                return res.status(200).json(guardado)
            }else{
                console.log(`Error contraseña`);
                const error= new Error("Error contraseña")
                error.code=9999
                return res.status(500).json(error)
            }
        }else{
            console.log(`Error Usuario no encontrado`);
            const error= new Error("Error Usuario no encontrado")
            error.code=9998
            return res.status(500).json(error)
        }
        
    } catch (error) {
        console.log(error);

        return res.status(500).json(error)
    }

})


async function addskills2user(name,userskills){
    let newskills=[];// nuevas skills
    let userskill=null;
    for (let i = 0; i < userskills.length; i++) {

        userskill=await Skill.findOne({ability:userskills[i]});
        if(!userskill) {//new skill
            userskill = new Skill({//crear skill
                ability:userskills[i],
                focus:"new",//para proxima actualizacion
                users:[name]
            })
            newskills.push(userskills[i]);//agregar a nuevas
        }else{// ya conocida update users

            if (!userskill.users.find((element) => element == name)) {//skill ya contiene usuario
                userskill.users=userskill.users.concat(name);
            }
            
        }
        await userskill.save();//guardar cambios skill                
        //console.log(`SfindOne success--> ${userskills}`);
    }

    return newskills
}

async function delskills2user(name,userskills){
    let newskills=[];// nuevas skills
    let userskill=null;
    for (let i = 0; i < userskills.length; i++) {

        userskill=await Skill.findOne({ability:userskills[i]});
        if(userskill) {//skill finded
            const index = userskill.users.indexOf(name);
            if (index > -1) {//skill ya contiene usuario
                userskill.users.splice(index, 1);
            }
        }
        await userskill.save();//guardar cambios skill                
        //console.log(`SfindOne success--> ${userskills}`);
    }

    return newskills
}

routerBD.post('/Skill/Focus', async function(req, res){

    const {focus,ability}=req.body;      

    try {
        const skill=await Skill.findOne({"ability":ability});//verificar usuario existe
        if(skill){//existe

                skill.focus=focus;//update skills
                let guardado=await skill.save();
                return res.status(200).json(guardado)
            
        }else{
            console.log(`Error Skill no encontrada`);
            const error= new Error("Error Skill no encontrada")
            error.code=9997
            return res.status(500).json(error)
        }
        
    } catch (error) {
        console.log(`Error`);
        return res.status(500).json(error)
    }

})

routerBD.post('/User/Add/Proyect', async function(req, res){

    const {name,pass,proyects=[]}=req.body;      

    try {
        const user=await Usuario.findOne({name:name});//verificar usuario existe
        if(user){//existe
            if (user.pass==pass) {
                const newproyects= await addproyects2user(name,proyects);
                for (let i = 0; i < proyects.length; i++) {
                    if (!user.proyects.find((element) => element == proyects[i].title)) {//proyect ya contiene usuario
                        user.proyects=user.proyects.concat(proyects[i].title);//update proyect
                    }          
                }

                let guardado=await user.save();
                guardado.addnew=newproyects;//agregar listado para completar

                return res.status(200).json(guardado)
            }else{
                console.log(`Error contraseña`);
                const error= new Error("Error contraseña")
                error.code=9999
                return res.status(500).json(error)
            }
        }else{
            console.log(`Error Usuario no encontrado`);
            const error= new Error("Error Usuario no encontrado")
            error.code=9998
            return res.status(500).json(error)
        }
        
    } catch (error) {
        console.log(`Error`);
        return res.status(500).json(error)
    }

})

routerBD.post('/User/Del/Proyect', async function(req, res){

    const {name,pass,proyects=[]}=req.body;      

    try {
        const user=await Usuario.findOne({name:name});//verificar usuario existe
        if(user){//existe
            if (user.pass==pass) {                
                
                var index = -1;
                for (let i = 0; i < proyects.length; i++) {                    
                    index = user.proyects.indexOf(proyects[i].title);
                    if (index > -1) {//proyect ya contiene usuario
                        user.proyects.splice(index, 1);
                    }else{
                        console.log(`Error not proyect`);
                    }
                }
                await delproyects2user(name,proyects);

                let guardado=await user.save();
                return res.status(200).json(guardado)
            }else{
                console.log(`Error contraseña`);
                const error= new Error("Error contraseña")
                error.code=9999
                return res.status(500).json(error)
            }
        }else{
            console.log(`Error Usuario no encontrado`);
            const error= new Error("Error Usuario no encontrado")
            error.code=9998
            return res.status(500).json(error)
        }
        
    } catch (error) {
        console.log(`Error`);
        return res.status(500).json(error)
    }

})


async function addproyects2user(name,userproyects){
    let newproyects=[];// nuevas proyects
    let userproyect=null;
    for (let i = 0; i < userproyects.length; i++) {

        userproyect=await Proyect.findOne({title:userproyects[i].title});
        if(!userproyect) {//new proyect
            userproyect = new Proyect({//crear proyect
                title:userproyects[i].title,
                description:userproyects[i].description,
                URLHTML:userproyects[i].URLHTML,
                URLJS:userproyects[i].URLJS,
                topic:"new",
                user:name
            })
            newproyects.push(userproyects[i]);//agregar a nuevas
        }else{// ya conocida update users

            if (!userproyect.user==name) {//proyect ya contiene usuario
                userproyect.description=userproyects[i].description;
                userproyect.URLHTML=userproyects[i].URLHTML;
                userproyect.URLJS=userproyects[i].URLJS;
            }

        }
        await userproyect.save();//guardar cambios proyect                
        //console.log(`SfindOne success--> ${userproyects}`);
    }

    return newproyects
}

async function delproyects2user(name,userproyects){
    let userproyect=null;
    for (let i = 0; i < userproyects.length; i++) {
        userproyect=await Proyect.findOne({title:userproyects[i].title});
        if(userproyect) {//proyect foud
            if (userproyect.user==name) {//proyect ya contiene usuario
                await Proyect.deleteMany({title:userproyects[i].title});
                console.log("delete "+userproyects[i].title)
            }else{
                console.log("Not user "+userproyects[i].title)
            }
        }
    }
}

routerBD.post('/Proyect/Topic', async function(req, res){

    const {topic=[],proyect}=req.body;      

    try {
        const title=await Proyect.findOne({title:proyect});//verificar usuario existe
        if(title){//existe

                title.topic=topic;//update proyects
                let guardado=await title.save();
                return res.status(200).json(guardado)
            
        }else{
            console.log(`Error proyect no encontrada`);
            const error= new Error("Error proyect no encontrada")
            error.code=9997
            return res.status(500).json(error)
        }
        
    } catch (error) {
        console.log(`Error`);
        return res.status(500).json(error)
    }

})

/*
routerBD.use((req,res,next)=>{
    if(req.query.password == "perrito123"){
        next()
    }else if(req.query.password == "gato123"){
        // res.send({
        //    alert:"Password sospechoso"
        // })
        console.log("Password sospechoso")
        next()
    }else{
        res.send("No tienes acceso")
    }

    console.log(`En tro al middleware desde: ${req.method} ${req.ip}`)
})*/

//routerBD.use(authMiddleware)



/*
routerBD.get("/goodbye",authJWT, function(req,res){
    res.json({"adios": "Mundo"})
})

routerBD.get('/getAll',authJWT,async function(req, res){
    try {
        const result = await Usuario.find()
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})
*/



routerBD.post('/login',async function(req,res){
    const email = req.body.email
    const password = req.body.password

    try {
        let objetoJWT = {
            email,
            password
        }

        jwt.sign(objetoJWT,'robertoRomero',(err,token)=>{
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