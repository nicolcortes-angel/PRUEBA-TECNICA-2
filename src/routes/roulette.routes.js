//1. importacion de dependecias y modulos 
import express from "express";
import { openRoulette, PutRoulette, closeRoulette } from "../controllers/roulette.controller.js";

const Roulette = express.Router();


// 1. Abrir ruleta
Roulette.put("/abrir/:id", openRoulette);

// 2. Apostar en la ruleta
Roulette.put("/apostar/:id", PutRoulette);

// 3. Cerrar ruleta
Roulette.put("/cerrar/:id", closeRoulette);

export default Roulette;
