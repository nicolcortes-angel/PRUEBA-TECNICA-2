import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url"; 

//desarollo de la configuracion de las funcionalidades 
const _filename = fileURLToPath(import.meta.url); //me permite ubicarme y convertir el archivo en una ruta, es decir este codigo significa que filename = backend/src/config/multer.js
const _dirname = path.dirname(_filename); //es para saber cual es la organzacion y estructura de las carpetas 

//1. crear una carpeta donde se guarden los archivos subidos 

const UPLOADS_FOLDER = path.join( _dirname, "../uploads");

if(!fs.existsSync(UPLOADS_FOLDER)){
 fs.mkdirSync(UPLOADS_FOLDER)


}




// 2. Especificar como lo vamos a guardar


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    cb(null, `${base}-${Date.now()}${ext}`);
    }
});




// 3. Que tipo de archivo vamos a recibir 
const filefilter = (req,file, cb) => {
     const allowed = ["image/gif", "image/jpeg", "image/png", "image/svg+xml", "image/webp"];

 if (allowed.includes(file.mimetype)){
    cb(null, true) // significa que si el archivo es poermitido lo guarde en la carpeta uploads 

 } else {
    cb(new Error("El archivo no es permitido"), false);
 }

}


// 4. definir limites - tamaño de archivo 

const limits = {
     fileSize: 5*1024*1024 //5MB
}






//5. Exportar esas caracteristicas
export const upload = multer({storage, filefilter, limits})

