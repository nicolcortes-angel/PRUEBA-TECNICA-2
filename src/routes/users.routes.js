//1. importacion de dependecias y modulos 
import express from "express"; 
import { postUser, getAllUsers, putUserById, deleteUserById, getUserById } from "../controllers/users.controller.js";
import { auth } from "../middleware/auth.js";
import { upload } from '../config/multer.js';


//2. Configurar las rutas 
export const userRouter = express.Router();

//3. Ruta para el POST 
userRouter.post("/crear", upload.none(), postUser);
userRouter.get("/mostrar", auth("admin"), getAllUsers);
userRouter.get("/mostrar/:id", getUserById);
userRouter.put("/actualizar/:id", putUserById);
userRouter.delete("/eliminar/:id",auth("admin"), deleteUserById);