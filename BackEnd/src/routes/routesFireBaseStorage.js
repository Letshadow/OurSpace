import { Router } from "express";
import { uploadFile } from "../controllers/FireBaseStorage.Controller.js";
import multer from "multer";

const routerST = Router();



////crear carpeta midleware
const upload = multer({storage: multer.memoryStorage()})

routerST.post("/uploadFile", upload.single("filename") ,uploadFile);

export default routerST;