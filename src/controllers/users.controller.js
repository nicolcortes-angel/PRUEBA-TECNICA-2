import { userModel } from "../models/users.model.js";
import bcryptjs from "bcryptjs";

// 1. Crear un usuario (POST)
export const postUser = async (request, response) => {
  try {
    // Encriptar la contraseña recibida
    const codedPassword = await bcryptjs.hash(request.body.password, 10);

    // Crear el nuevo usuario con la contraseña encriptada
    const newUser = {
      ...request.body,
      password: codedPassword,
      role: "user", // valor por defecto
    };

    await userModel.create(newUser);

    return response.status(201).json({
      mensaje: "Usuario creado correctamente",
    });
  } catch (error) {
    return response.status(400).json({
      mensaje: "Ocurrió un error al crear el usuario",
      error: error.message || error,
    });
  }
};

// 2. Obtener todos los usuarios (GET)
export const getAllUsers = async (request, response) => {
  try {
    const allUsers = await userModel.find().select("-password");
    return response.status(200).json({
      mensaje: "Petición exitosa",
      data: allUsers,
    });
  } catch (error) {
    return response.status(400).json({
      mensaje: "Ocurrió un error al mostrar los usuarios",
      error: error.message || error,
    });
  }
};

// 2.1 Obtener un usuario por ID (GET)
export const getUserById = async (request, response) => {
  try {
    const idForSearch = request.params.id;
    const userById = await userModel.findById(idForSearch).select("-password");
    return response.status(200).json({
      mensaje: "Petición exitosa",
      data: userById,
    });
  } catch (error) {
    return response.status(400).json({
      mensaje: "Ocurrió un error al mostrar el usuario",
      error: error.message || error,
    });
  }
};

// 3. Actualizar un usuario por ID (PUT)
export const putUserById = async (request, response) => {
  try {
    const idForUpdate = request.params.id;

    // Encriptar contraseña si se envió
    let codedPassword;
    if (request.body.password) {
      codedPassword = await bcryptjs.hash(request.body.password, 10);
    }

    // Crear objeto actualizado
    const updatedUser = {
      ...request.body,
      password: codedPassword,
    };

    // Eliminar campos undefined
    Object.keys(updatedUser).forEach(
      (key) => updatedUser[key] === undefined && delete updatedUser[key]
    );

    await userModel.findByIdAndUpdate(idForUpdate, updatedUser);

    return response.status(200).json({
      mensaje: "Usuario actualizado correctamente",
    });
  } catch (error) {
    return response.status(400).json({
      mensaje: "Ocurrió un error al actualizar el usuario",
      error: error.message || error,
    });
  }
};

// 4. Eliminar un usuario por ID (DELETE)
export const deleteUserById = async (request, response) => {
  try {
    const idForDelete = request.params.id;
    await userModel.findByIdAndDelete(idForDelete);
    return response.status(200).json({
      mensaje: "Usuario eliminado correctamente",
    });
  } catch (error) {
    return response.status(400).json({
      mensaje: "Ocurrió un error al eliminar el usuario",
      error: error.message || error,
    });
  }
};