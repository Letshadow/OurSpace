import express from "express";
import routes from "./routes/routes.js";

const app=express();

app.use(express.json())// permite recibir json
app.use(express.urlencoded({extended:false}))//no recibir json en la barra de busqueda

app.use(routes)
app.listen(3000)

console.log("Server UP")