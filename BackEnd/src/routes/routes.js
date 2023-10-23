import { Router } from "express";
import { uploadFile } from "../controllers/FireBaseStorage.Controller.js";
import multer from "multer";

const router = Router();

////crear carpeta midleware
const upload = multer({storage: multer.memoryStorage()})

router.post("/uploadFile", upload.single("filename") ,uploadFile);

export default router;