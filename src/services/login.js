import { userModel } from "../models/users.model.js";
import { generateToken } from "../config/jwt.js";
import bcryptjs from "bcryptjs";
import { request } from "express";

export const login = async (request, response) => {
 try {

    const {emailLogin, passwordLogin} = request.body;

    const userFound = await userModel.findOne({
        email: emailLogin

    });

    console.log("usuario encontrado:", userFound);

    if(!userFound){
        return response.status(404).json({
            "mensaje": "usuario no encontrado, resgistrate por fis "
        });
    }

    const validPassword = await bcryptjs.compare(passwordLogin, userFound.password);
 
      if(!validPassword){
        return response.status(401).json({
            "mensaje": "Contraseña incorrecta." // Corregido: Debe decir incorrecta
        });
    }

    // generacion de token  
    const payload = {
        id: userFound._id,
        user: userFound.username
    }

    if(userFound.role === "admin"){
        payload.admin = true;
    } else {
        payload.admin = false;
    }

    const token = await generateToken(payload);
    console.log("payload : ", payload);
    console.log("token", token);

    return response.status(200).json({
        "mensaje" : "Usuario ok y exitoso",
        "token" : token
    })

 } catch (error){ 
    return response.status(401).json({
      "mensaje": "Error en el user ",
      
    });


 }
}