import { Router } from "express";
import { uploadFile ,delFile} from "../controllers/FireBaseStorage.Controller.js";
import multer from "multer";

const routerST = Router();



////crear carpeta midleware
const upload = multer({storage: multer.memoryStorage()})

routerST.post("/uploadFile", upload.single("filename") ,uploadFile);
routerST.post("/delFile", upload.single("filename") ,delFile);

export default routerST;