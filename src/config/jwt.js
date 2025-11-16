// 1. importar dependencias y modulos necesrios
import dotenv from "dotenv";
import JsonWebToken from "jsonwebtoken";


// 2. configurar la variablke de entorno  
dotenv.config();
const key = process.env.SECRET_KEY;



// 3. Configurar el uso de jsonwebtoken 


// 3.1 metodo para generar un JWT
export const generateToken = (payload) => {
    return new Promise((resolve, reject) => {
        JsonWebToken.sign(payload, key, {expiresIn: "1h"}, (error, token) => {
            if(error) {
                reject (new Error("Hubo un error al generar el JWT", error.message))
            } else {
                resolve(token);
            }
        })
    });
}


// 3.2 metodo para 

export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        JsonWebToken.verify(token, key, (error, decoded) => {
            if(error) {
                reject (new Error("Hubo un error al verificar el JWT", error.message))
            } else {
                resolve(decoded);
            }
        })
    });
}
