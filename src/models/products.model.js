// 1. Importamos
import mongoose from "mongoose";

// 2. contruir la plantilla del modelo
const productSchema = new mongoose.Schema({
 
    nombre: {
        type:String,
        required:true
    },
    apellidos: {
        type:String
    }, 
    codigo_departamento: {
        type: Number,
        required:true
    },
     date: {
        type: Date,
        default: Date.now
    }
});

export const productModel = mongoose.model("Productos", productSchema);