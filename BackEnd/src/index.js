import express from "express";
import routesST from "./routes/routesFireBaseStorage.js";
import routesBD from "./routes/routesMongoDB.js";
import dotenv from "dotenv";
import mongoose from 'mongoose';

dotenv.config('Server.env')//?


//configuracion Mongodb
//const URLMongo=process.env.URLMongoDB

const URLMongo="mongodb+srv://letshadow98:OurSpace2023@ourspacecl.bvljyyx.mongodb.net/OurSpace"
mongoose.connect(URLMongo)//Conectar
const database = mongoose.connection//Bandera conexion

database.on('error',(error)=>{//catch
    console.log(error)
})

database.once('connected',()=>{
    console.log("Conexion BD exitosa")
})

//Configuracion express
const app=express();

app.use(express.json())// permite recibir json
app.use(express.urlencoded({extended:false}))//no recibir json en la barra de busqueda

app.use("/api/ST/",routesST)
app.use("/api/BD/",routesBD)
//app.listen(process.env.Port)
app.listen(3000)

console.log("Server UP")
