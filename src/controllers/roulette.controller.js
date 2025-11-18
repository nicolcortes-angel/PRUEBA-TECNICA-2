//1. importar dependencias y modulos necesarias
import { Roulette } from "../models/roulette.model";

// definir las acciones que van a realizar - CRUD 

// 1. METODO ABRIR LA RULETAA = ABRIR 
export const openRoulette = async (request, response) => {
    try {
      const { id } = request.params;
  
      const roulette = await Roulette.findById(id);
  
      if (!roulette) {
        return response.status(404).json({ message: "Ruleta no encontrada" });
      }
  
      if (roulette.state === "abierta") {
        return response.status(400).json({ message: "La ruleta ya está abierta" });
      }
  
      roulette.state = "abierta";
      await roulette.save();
  
      return response.json({ message: "Ruleta abierta correctamente" });
  
    } catch (error) {
      return response.status(500).json({
         message: "Error al abrir ruleta", error });
    }
  };
  



// 2. METODO PARA APOSTAR EN RULETTA = PUT
export const PutRoulette = async (request, response) => {
    try {
      const { id } = request.params;
      const { userId, amount, number, color } = request.body;
  
      const roulette = await Roulette.findById(id);
  
      if (!roulette) {
        return response.status(404).json({
          mensaje: "Ruleta no encontrada"
        });
      }
  
      if (roulette.state !== "open") {
        return response.status(400).json({
          mensaje: "La ruleta no está abierta"
        });
      }
  
      // Validar apuesta a número o color
      if (number === undefined && !color) {
        return response.status(400).json({
          mensaje: "Debes apostar a un número o un color"
        });
      }
  
      // Guardar la apuesta
      roulette.bets.push({
        userId,
        amount,
        number,
        color
      });
  
      await roulette.save();
  
      return response.status(201).json({
        mensaje: "Apuesta registrada correctamente"
      });
  
    } catch (error) {
      return response.status(500).json({
        mensaje: "Error al registrar la apuesta",
        error: error.message
      });
    }
  };
  

// 3. METODO PARA CERRAR LA RULETA  = DELETE
export const closeRoulette = async (request, response) => {
    try {
      const { id } = request.params;
  
      const roulette = await Roulette.findById(id);
  
      if (!roulette) {
        return response.status(404).json({
          mensaje: "Ruleta no encontrada"
        });
      }
  
      if (roulette.state !== "open") {
        return response.status(400).json({
          mensaje: "La ruleta no está abierta"
        });
      }
  
      // Número ganador entre 0 y 36
      const winningNumber = Math.floor(Math.random() * 37);
  
      // Color según la regla: pares = rojo, impares = negro
      const winningColor = winningNumber % 2 === 0 ? "red" : "black";
  
      // Evaluar apuestas
      const results = roulette.bets.map((bet) => {
        let payout = 0;
  
        if (bet.number === winningNumber) {
          payout = bet.amount * 5;
        } else if (bet.color === winningColor) {
          payout = bet.amount * 1.8;
        }
  
        return {
          userId: bet.userId,
          numeroApostado: bet.number,
          colorApostado: bet.color,
          cantidadApostada: bet.amount,
          ganancia: payout
        };
      });
  
      // Cerrar ruleta y borrar apuestas
      roulette.state = "closed";
      roulette.bets = [];
      await roulette.save();
  
      return response.status(200).json({
        mensaje: "La ruleta fue cerrada correctamente",
        numeroGanador: winningNumber,
        colorGanador: winningColor,
        resultados: results
      });
  
    } catch (error) {
      return response.status(500).json({
        mensaje: "Error al cerrar la ruleta",
        error: error.message
      });
    }
  };
  