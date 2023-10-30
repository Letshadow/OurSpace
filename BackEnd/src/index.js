import express from "express";
import routesST from "./routes/routesFireBaseStorage.js";
import routesBD from "./routes/routesMongoDB.js";
import dotenv from "dotenv";
import mongoose from 'mongoose';

dotenv.config()


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

const corsfront=(req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
}
app.use(corsfront)
app.use("/api/ST/",routesST)
app.use("/api/BD/",routesBD)

app.use("/",function(req,res){
    res.json({
        "Hola": "Mundo",
        "/api/ST/":{
            "Description":"Conexion a Firebase para almacenar proyectos usuarios",
            "/api/ST/uploadFile":{
                "Description":"subida de archivos firebase segun usuario",
                "type":"POST",
                "body":{
                    "user":"Nombre de usuario para guardar en carpeta propia",
                    "filename":"Archivo"
                },
                "respuesta":{
                    "user": "nombre de usuario",
                    "name": "nombre archivo (internamente agrega fecha y hora al nombre)",
                    "type": "text/plain (de preferencia)",
                    "downloadURL": "Link de acceso"
                },
                "respuesta_ejemplo":{
                    "name": "letshadow",
                    "namef": "ifelse.txt",
                    "type": "text/plain",
                    "downloadURL": "https://firebasestorage.googleapis.com/v0/b/ourspace-5516a.appspot.com/o/letshadow%2F2023-9-6_13-0-21_ifelse.txt?alt=media&token=0e982ec2-5c46-4bc4-b12f-86772843d2b2"
                },
                "body test":{
                    "name":"sensei",
                    "filename":"ejercicio.txt(subir archivo)"
                },
            },
            "/api/ST/delfile":{
                "Description":"eliminacion de archivos firebase segun usuario y url",
                "type":"POST",
                "body":{
                    "user":"Nombre de usuario para bitacora",
                    "filename":"Archivo"
                },
                "respuesta":{
                    "user": "nombre de usuario",                   
                    "fileurl": "Link de acceso archivo a borrar",
                },
                "respuesta_ejemplo":{
                    "name": "letshadow",
                    "date": "2023-9-0_5-31-23",
                    "URL": "https://firebasestorage.googleapis.com/v0/b/ourspace-5516a.appspot.com/o/letshadow%2FComunicado%20de%20interes%20general%20para%20todos%20los%20Asociados.pdf?alt=media&token=a73b8189-5c67-49a1-b86f-c91c54b2515c&_gl=1*whmodu*_ga*MTAwOTUxNzU1My4xNjk3Njc2NzI4*_ga_CW55HF8NVT*MTY5ODU3MzAyOC4xNS4xLjE2OTg1NzU0NzIuNTYuMC4w"
                },
                "body test":{
                    "name":"sensei",
                    "fileurl":"ejercicio.txt(obtener link de arivo subido)"
                },
            },
        },
        "/api/BD/":{
            "Description":"CRUD para base de datos de usuarios red social OurSpace en la que los usuarios tendran contraseña,contactos,habilidades, proyectos",

            "/api/BD":{
                "Description":"prueba conexion Mongo DB",
                "type":"GET",
                "respuesta":{"Hola": "Mundo MongoDB"},
                "respuesta_ejemplo":{"Hola": "Mundo MongoDB"},
            },

            "/api/BD/Register":{
                "Description":"registrar un usuario con nombre de usuario,contraseña,habilidades en la base de datos (si la habilidad no esta en la base se agrega con con en enfoque como new, si el usuario ya existe no lo creara)",
                "type":"POST",
                "body":{
                    "name":"nombre de usuario",
                    "pass":"contraseña",
                    "skills":"array habilidades"
                },

                "respuesta":{
                    "ObjetoUsuario": {
                        "Descipcion":"Objeto con los Id de mongo, nombre de usuario, contraseña, contactos, titulos de proyectos, nombres de habilidades que contiene en la BD",
                    "respuesta_ejemplo":{
                        "_id": "6539d0d788dce590028bb75f",
                        "name": "prueba2",
                        "pass": "123",
                        "contacts": [],
                        "proyects": [],
                        "skills": [
                            "game",
                            "relax"
                        ],
                        "__v": 0
                    }
                    }
                },
                "body test":{
                    "name":"sensei",
                    "pass":"perrito123",
                    "skills":["dev","fullstack","paciente"]
                }
            },

            "/api/BD/User/Add/Contact":{
                "Description":"agrega un contacto con nombre de usuario dentro de la base de datos,(si la contraseña no corresponde no lo agregara, si el usuario ya existe no lo agregara)",
                "type":"POST",
                "body":{
                    "name":"nombre usuario",
                    "pass":"contraseña",
                    "contacts":"contacto a agregar"
                },

                "respuesta":{
                    "ObjetoUsuario": {
                        "Descipcion":"Objeto con los Id de mongo, nombre de usuario, contraseña, contactos, titulos de proyectos, nombres de habilidades que contiene en la BD",
                    "respuesta_ejemplo":{
                        "_id": "653d4ccd0f8d1816e487dbbc",
                        "name": "prueba",
                        "pass": "123",
                        "contacts": [
                            "amigo2"
                        ],
                        "proyects": [
                            "P1"
                        ],
                        "skills": [
                            "dev",
                            "relax"
                        ],
                        "__v": 7
                    }
                    }
                },
                "body test":{
                    "name":"sensei",
                    "pass":"perrito123",
                    "contact":"amigo"
                }
            },

            "/api/BD/User/Add/Skills":{
                "Description":"agrega un array de habilidad con nombre de usuario dentro de la base de datos,(si la contraseña no corresponde no las agregara, si alguna habilidad no existe la agregara con el enfoque new)",
                "type":"POST",
                "body":{
                    "name":"nombre usuario",
                    "pass":"contraseña",
                    "skills":"array habilidades a agregar"
                },

                "respuesta":{
                    "ObjetoUsuario": {
                        "Descipcion":"Objeto con los Id de mongo, nombre de usuario, contraseña, contactos, titulos de proyectos, nombres de habilidades que contiene en la BD",
                    "respuesta_ejemplo":{
                        "_id": "653d4ee83206bc54305842f4",
                        "name": "prueba2",
                        "pass": "123",
                        "contacts": [],
                        "proyects": [
                            "P2"
                        ],
                        "skills": [
                            "game",
                            "relax"
                        ],
                        "__v": 7
                    }
                    }
                },
                "body test":{
                    "name":"sensei",
                    "pass":"perrito123",
                    "skills":["cooking","game"]
                }
            },

            "/api/BD/User/Add/Proyects":{
                "Description":"agrega un array de proyectos con nombre de usuario dentro de la base de datos,(si la contraseña no corresponde no los agregara,si el proyecto ya existe lo actualizara siempre que el usuario coincida, si algun proyecto no existe lo agregara con el tema new)",
                "type":"POST",
                "body":{
                    "name":"sensei",
                    "pass":"perrito123",
                    "proyects":[
                        {
                            "title":"titulo proyecto",
                            "description":"simulador atm",
                            "URLHTML":"enlace codigo html firebase",
                            "URLJS":"enlace codigo js firebase"
                        }
                    ]
                },

                "respuesta":{
                    "ObjetoUsuario": {
                        "Descipcion":"Objeto con los Id de mongo, nombre de usuario, contraseña, contactos, titulos de proyectos, nombres de habilidades que contiene en la BD",
                    "respuesta_ejemplo":{
                        "_id": "653d4ee83206bc54305842f4",
                        "name": "prueba2",
                        "pass": "123",
                        "contacts": [],
                        "proyects": [
                            "P2"
                        ],
                        "skills": [
                            "game",
                            "relax"
                        ],
                        "__v": 7
                    }
                    }
                },
                "body test":{
                    "name":"sensei",
                    "pass":"perrito123",
                    "proyects":[
                        {
                            "title":"Cajero",
                            "description":"simulador atm",
                            "URLHTML":"www.htmlcajero",
                            "URLJS":"www.jscajero"
                        },
                        {
                            "title":"Pinteres",
                            "description":"clon pinteres",
                            "URLHTML":"www.htmlpin",
                            "URLJS":"www.jspin"
                        },
                    ]
                }
            },

            "/api/BD/Users":{
                "Description":"Leer usuarios",
                "type":"GET",
                "respuesta":{
                    "arrayusuarios": {
                        "Descipcion":"Array con los usuarios y acceso de primer nivel a sus propiedades(pendiente codificar pass jwt)",
                    "respuesta_ejemplo":[
                        {
                            "_id": "6539d0d788dce590028bb75f",
                            "name": "Uinicial",
                            "pass": "123",
                            "contacts": [],
                            "proyects": [],
                            "skills": [
                                "Sinicial"
                            ],
                            "__v": 0
                        },
                        {
                            "_id": "653d4ccd0f8d1816e487dbbc",
                            "name": "prueba",
                            "pass": "123",
                            "contacts": [
                            "amigo2"
                            ],
                            "proyects": [
                            "P1"
                            ],
                            "skills": [
                            "dev",
                            "relax"
                            ],
                            "__v": 6
                        },
                        {
                            "_id": "653d4ee83206bc54305842f4",
                            "name": "prueba2",
                            "pass": "123",
                            "contacts": [],
                            "proyects": [
                                "P2"
                            ],
                            "skills": [
                                "game",
                                "relax"
                            ],
                            "__v": 5
                        }
                    ]
                    }
                },
            },

            "/api/BD/User/Skills":{
                "Description":"filtrar usuarios que contengan habilidades especificadas",
                "type":"POST",
                "body":{
                    "ability":"Nombre de habilidad a filtrar"
                },

                "respuesta":{
                    "arrayusuarios": {
                        "Descipcion":"Array con los usuarios que tienen esa habilidad y acceso de primer nivel a sus propiedades(pendiente codificar pass jwt)",
                    "respuesta_ejemplo":[
                        {
                            "_id": "653d4ccd0f8d1816e487dbbc",
                            "name": "prueba",
                            "pass": "123",
                            "contacts": [
                                "amigo2"
                            ],
                            "proyects": [
                                "P1"
                            ],
                            "skills": [
                                "dev",
                                "relax"
                            ],
                            "__v": 6
                        },
                        {
                            "_id": "653d4ee83206bc54305842f4",
                            "name": "prueba2",
                            "pass": "123",
                            "contacts": [],
                            "proyects": [
                                "P2"
                            ],
                            "skills": [
                                "game",
                                "relax"
                            ],
                            "__v": 5
                        }
                    ]
                    }
                },
                "body test":{
                    "ability":["dev","relax"]
                }
            },

            "/api/BD/User/Topics":{
                "Description":"filtrar usuarios que contengan las tematicas especificadas en susu proyectos",
                "type":"POST",
                "body":{
                    "topic":"Nombre de tematica en proyectos a filtrar"
                },

                "respuesta":{
                    "arrayusuarios": {
                        "Descipcion":"Array con los usuarios que tienen esa tematica en sus proyectos y acceso de primer nivel a sus propiedades(pendiente codificar pass jwt)",
                    "respuesta_ejemplo":[
                        {
                            "_id": "6539d0d788dce590028bb75f",
                            "name": "Uinicial",
                            "pass": "123",
                            "contacts": [],
                            "proyects": [],
                            "skills": [
                                "Sinicial"
                            ],
                            "__v": 0
                        },
                        {
                            "_id": "653d4ccd0f8d1816e487dbbc",
                            "name": "prueba",
                            "pass": "123",
                            "contacts": [
                                "amigo2"
                            ],
                            "proyects": [
                                "P1"
                            ],
                            "skills": [
                                "dev",
                                "relax"
                            ],
                            "__v": 6
                        }
                    ]
                    }
                },
                "body test":{
                    "topic":["test"]
                }
            },

            "/api/BD/Skills":{
                "Description":"Leer habilidades",
                "type":"GET",
                "respuesta":{
                    "arraynombreshabilidades": {
                        "Descipcion":"Array con los nombres de todas las habilidades en la BD",
                    "respuesta_ejemplo":[
                        "dev",
                        "game",
                        "relax",
                        "sinicial"
                    ],
                    }
                },
            },

            "/api/BD/Topics":{
                "Description":"Leer temas proyectos",
                "type":"GET",
                "respuesta":{
                    "arraynombrestemasproyectos": {
                        "Descipcion":"Array con los nombres de todos los temas de los proyectos en la BD",
                    "respuesta_ejemplo":[
                        "test",
                        "test2"
                    ],
                    }
                },
            },

            "/api/BD/User":{
                "Description":"leer usuario por nombre",
                "type":"POST",
                "body":{
                    "name":"Nombre de usuario a buscar"
                },

                "respuesta":{
                    "ObjetoUsuario": {
                        "Descipcion":"Objeto con los Id de mongo, nombre de usuario, contraseña, contactos, titulos de proyectos, nombres de habilidades que contiene en la BD",
                    "respuesta_ejemplo":{
                        "_id": "653d4ccd0f8d1816e487dbbc",
                        "name": "prueba",
                        "pass": "123",
                        "contacts": [
                            "amigo2"
                        ],
                        "proyects": [
                            "P1"
                        ],
                        "skills": [
                            "dev",
                            "relax"
                        ],
                        "__v": 6
                    },
                    }
                },
                "body test":{
                    "name":"prueba",
                }
            },
            
            "/api/BD/Skill":{
                "Description":"leer habilidad por nombre",
                "type":"POST",
                "body":{
                    "ability":"Nombre de habilidad a buscar"
                },

                "respuesta":{
                    "ObjetoSkill": {
                        "Descipcion":"Objeto con los Id de mongo, nombre de habilidad, enfoque de la habilidad, contactos, nombres de usuarios que contienen la habilidad en la BD",
                    "respuesta_ejemplo":{
                        "_id": "653d4ccd0f8d1816e487dbbe",
                        "ability": "dev",
                        "focus": "new",
                        "users": [
                            "prueba"
                        ],
                        "__v": 2
                    },
                    }
                },
                "body test":{
                    "ability":"dev",
                },
            },

            "/api/BD/Proyect":{
                "Description":"leer Proyecto por nombre",
                "type":"POST",
                "body":{
                    "title":"Nombre de proyecto a buscar"
                },

                "respuesta":{
                    "ObjetoProyect": {
                        "Descipcion":"Objeto con los Id de mongo, nombre de proyecto, descripcion, UrlHTM de firebase, UrlJS de firebase,nombres de usuario dueño del proyecto en la BD",
                    "respuesta_ejemplo":{
                        "_id": "653b539dd264f2abc0350d97",
                        "title": "P0",
                        "description": "Zero",
                        "URLHTML": "www.html",
                        "URLJS": "www.js",
                        "topic": "test",
                        "user": "Uinicial",
                        "__v": 0
                    },
                    }
                },
                "body test":{
                    "title":"P0",
                },
            },
            
            "/api/BD/Skill/Focus":{
                "Description":"actualiza el enfoque de una habilidad con el nombre de habilidad dentro de la base de datos (si no la encuentra no la creara)",
                "type":"POST",
                "body":{
                    "ability":"nombre de la habilidad",
                    "focus":"nombre enfoque de la habilidad"
                },

                "respuesta":{
                    "ObjetoSkill": {
                        "Descipcion":"Objeto con los Id de mongo, nombre de habilidad, enfoque de la habilidad, contactos, nombres de usuarios que contienen la habilidad en la BD",
                    "respuesta_ejemplo":{
                        "_id": "653d4ccd0f8d1816e487dbc1",
                        "ability": "relax",
                        "focus": "soft",
                        "users": [
                            "prueba"
                        ],
                        "__v": 0
                    }
                    }
                },
                "body test":{
                    "ability":"cooking",
                    "focus":"NoDevJob"
                }
            },

            "/api/BD/Proyect/Topic":{
                "Description":"actualiza el tema de un proyecto con el nombre de proyecto dentro de la base de datos (si no lo encuentra no lo creara)",
                "type":"POST",
                "body":{
                    "proyect":"nombre del proyecto",
                    "topic":"nombre tema del proyecto"
                },

                "respuesta":{
                    "ObjetoSkill": {
                        "Description":"Objeto con los Id de mongo, nombre de proyecto, descripcion, UrlHTM de firebase, UrlJS de firebase,nombres de usuario dueño del proyecto en la BD",
                    "respuesta_ejemplo":{
                        "_id": "653d50eb3206bc5430584328",
                        "title": "P2",
                        "description": "second",
                        "URLHTML": "www.html",
                        "URLJS": "www.js",
                        "topic": "test2",
                        "user": "prueba2",
                        "__v": 0
                    }
                    }
                },
                "body test":{
                    "proyect":"Cajero",
                    "topic":"Financiero"
                }
            },

            "/api/BD/User/Del/Contact":{
                "Description":"Elimina un contacto con nombre de usuario dentro de la base de datos,(si la contraseña no corresponde no lo borrara)",
                "type":"POST",
                "body":{
                    "name":"nombre usuario",
                    "pass":"contraseña",
                    "contacts":"contacto a eliminar"
                },

                "respuesta":{
                    "ObjetoUsuario": {
                        "Descipcion":"Objeto con los Id de mongo, nombre de usuario, contraseña, contactos, titulos de proyectos, nombres de habilidades que contiene en la BD",
                    "respuesta_ejemplo":{
                        "_id": "653d4ccd0f8d1816e487dbbc",
                        "name": "prueba",
                        "pass": "123",
                        "contacts": [
                            "amigo2",
                        ],
                        "proyects": [
                            "P1"
                        ],
                        "skills": [
                            "dev",
                            "relax"
                        ],
                        "__v": 9
                    }
                    }
                },
                "body test":{
                    "name":"sensei",
                    "pass":"perrito123",
                    "contact":"amigo"
                }
            },

            "/api/BD/User/Del/Skills":{
                "Description":"Elimina un array de habilidad con nombre de usuario dentro de la base de datos,(si la contraseña no corresponde no las borrara)",
                "type":"POST",
                "body":{
                    "name":"nombre usuario",
                    "pass":"contraseña",
                    "skills":"array habilidades a eliminar"
                },

                "respuesta":{
                        "_id": "653d4ee83206bc54305842f4",
                        "name": "prueba2",
                        "pass": "123",
                        "contacts": [],
                        "proyects": [
                            "P2"
                        ],
                        "skills": [
                            "game",
                            "relax",
                        ],
                        "__v": 7
                },
                "body test":{
                    "name":"sensei",
                    "pass":"perrito123",
                    "skills":["cooking"]
                }
            },

            "/api/BD/User/Del/Proyects":{
                "Description":"Elimina un array de proyectos con nombre de usuario dentro de la base de datos,(si la contraseña no corresponde no los borrara,si el proyecto ya existe lo borrara siempre que el usuario coincida, si algun proyecto no existe lo agregara con el tema new",
                "type":"POST",
                "body":{
                    "name":"Nombre de usuario",
                    "pass":"contraseña",
                    "proyects":["titulo proyecto"]
                },

                "respuesta":{
                    "ObjetoUsuario": {
                        "Descipcion":"Objeto con los Id de mongo, nombre de usuario, contraseña, contactos, titulos de proyectos, nombres de habilidades que contiene en la BD",
                    "respuesta_ejemplo":{
                        "_id": "653d4ccd0f8d1816e487dbbc",
                        "name": "prueba",
                        "pass": "123",
                        "contacts": [
                            "amigo2"
                        ],
                        "proyects": [
                            "P1"
                        ],
                        "skills": [
                            "dev",
                            "relax"
                        ],
                        "__v": 14
                    }
                    }
                },
                "body test":{
                    "name":"sensei",
                    "pass":"perrito123",
                    "proyects":["Cajero","Pinteres"]
                }
            },

        }
    })
})

app.listen(process.env.PORT|| 3000,()=>{

    console.log("Server UP for "+process.env.PORT)
})

/*app.listen(3000,()=>{
    console.log("Server UP")
})*/


