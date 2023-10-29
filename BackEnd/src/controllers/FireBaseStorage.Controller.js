import { initializeApp } from "firebase/app";
import myfirebaseConfig from "../config/FireBaseStorage.Config.js";
import {deleteObject,getStorage,ref,getDownloadURL,uploadBytesResumable} from "firebase/storage";

//getStorage:   url carpeta crear bucket Objet
//ref:  referencia de que y como se guarda//  bucket Objet,path
//getDownloadURL:   al subir archivo se obtiene url de acceso
//uploadBytesResumable: permite subir archibo como burffer // path, archivo en foma de buffer,metadata


/**
 * Subir archivo 
 * user:    nombreusuario
 * tag: tags
 * filename:    filename
 */
export async function uploadFile(req,res){

    const firebaseConfig = initializeApp(myfirebaseConfig);// Inicializar app con configuracion

    const storage = getStorage(firebaseConfig)// bucket Objet


    try{

        const dateTime = giveCurrentDateTime();//Obtener fecha de subida

        const storageRef = ref(storage,`${req.body.name}/${dateTime+ '_'+req.file.originalname}`);

        const metadata = {
            contentType : req.file.mimetype//extencion del archivo
            ///autor
            //tags
        }        
        
        const myfile = await uploadBytesResumable(storageRef,req.file.buffer,metadata)//copia de archivo a subir

        const downloadURL = await getDownloadURL(myfile.ref)

        console.log("Carga exitosa")

        res.status(200).json({
            ///autor
            //tags
            name: req.body.name,
            namef: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })

    }catch(err){
        res.status(400).send(err.message)
    }

    
}

/**
 * Subir archivo 
 * user:    nombreusuario
 * tag: tags
 * filename:    filename
 */

export async function delFile(req,res){
    const firebaseConfig = initializeApp(myfirebaseConfig);// Inicializar app con configuracion

   const storage = getStorage(firebaseConfig)// bucket Objet
    //var storage = firebase.storage().ref();
    //console.log("in")
    try{

        // Create a reference to the file to delete
        const desertRef = ref(storage,req.body.fileurl);

        // Delete the file
        deleteObject(desertRef).then(() => {
            const dateTime = giveCurrentDateTime();//Obtener fecha de subida
            res.status(200).json({
                name:req.body.name,
                date:dateTime,
                URL: req.body.fileurl,           
            })
            console.log("file deleted")
        // File deleted successfully
        }).catch((error) => {
            console.log(error)
        // Uh-oh, an error occurred!
        });
        

    }catch(err){
        res.status(400).send(err.message)
    }

    
}

/**
 * Obtener fecha de subida
 */
function giveCurrentDateTime() {
    const today = new Date()
    const date = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDay()
    const time = today.getHours() + '-' + today.getMinutes() + '-' + today.getSeconds()
    const dateTime = date + '_' + time 
    return dateTime
}

