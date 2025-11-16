// 1. importamos las dependencias necesarias

import mongoose from "mongoose";


// 2. crearse la funcion conexion 
export const conexionMongo = async () =>{
try { await mongoose.connect(process.env.BD_URL, {dbName:"casino"});
console.log("conexion exitosa con la base de datos");


} catch {
 console.log("Error de conexion: ", error);
 
}

}