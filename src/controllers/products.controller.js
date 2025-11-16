//1. importar dependencias y modulos necesarias
import { productModel } from "../models/products.model.js";

// definir las acciones que van a realizar - CRUD 

// 1. METODO PARA CREAR UN PRODUCTO = POST 
export const postProduct = async (request, response) => {
try {

    

const newProduct = { 
    ...request.body,
    
}


        await productModel.create(newProduct);

        return response.status(201).json({
            "mensaje": "Producto creado correctamente"
        });

    } catch (error) {
        return response.status(400).json({
            "mensaje": "Ocurrió un error al crear producto",
            "error": error.message || error //alt + 124 o  alt gr + 1
        })
    }

}


// 2. METODO PARA MOSTRAR UN PRODUCTO = GET
export const getProducts = async (request, response) => {
 try {
        const allProducts = await productModel.find();

        return response.status(200).json({
            "mensaje": "Petición exitosa",
            "data": allProducts
        })

    } catch (error) {
        return response.status(500).json({
            "mensaje": "Ocurrió un error al mostrar productos",
            "error": error.message || error
        })
    }
}

// 3. METODO PARA ACTUALIZAR UN PRODUCTO = PUT
export const putProduct = async (request, response) => {
 try {
        const idForUpdate = request.params.id;
        const dataForUpdate = request.body;

        await productModel.findByIdAndUpdate(idForUpdate, dataForUpdate);

        return response.status(200).json({
            "mensaje":"Producto actualizado exitosamente"
        });

    } catch (error) {
        return response.status(500).json({
            "mensaje": "Ocurrió un error al actualizar producto",
            "error": error.message || error
        })
    }

}

// 3. METODO PARA ELIMINAR UN PRODUCTO = DELETE
export const deleteProductById = async (request, response) => {
 try {
        const idForDelete = request.params.id;
        await productModel.findByIdAndDelete(idForDelete);

        return response.status(200).json({
            "mensaje": "Producto eliminado exitosamente"
        });

    } catch (error) {
        return response.status(500).json({
            "mensaje": "Ocurrió un error al eliminar producto",
            "error": error.message || error
        })
    }

}
