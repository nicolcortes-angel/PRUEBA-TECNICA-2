//El archivo de ejecucion de nuestra aplicacion 
//Configurar nuestro servidor y gestionar la logica de negocio 


// 1. insentar las dependecias y modulos necesarios necesarias
import express from "express";
import dotenv from "dotenv";
import { conexionMongo } from "./src/config/db.js";
import { productRouter } from "./src/routes/products.routes.js";
import { userRouter } from "./src/routes/users.routes.js";
import { loginRouter } from "./src/routes/login.routes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";





// 2. Configurar las dependencias que necesitamos
const app = express();
dotenv.config();
const port = process.env.PORT;
conexionMongo(); //conexion con dv
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);



// 3. Funcionalidades que necesite agregar 
app.get("/",(request,response)=>{
  response.send(`server works!`)
});

app.use(cors()); //habilitacion cors 
app.use(express.json());
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/uploads", express.static(path.join(_dirname, "src/uploads")));

// 4. levantar el servidor  
app.listen(port, ()=>{
  console.log(`El servidor está ejecutándose en http://localhost:${port}`)
});