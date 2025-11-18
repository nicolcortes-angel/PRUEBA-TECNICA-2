//1. importacion de dependecias y modulos 
import express from "express";
import { openRoulette, PutRoulette, closeRoulette } from "../controllers/roulette.controller.js";

const router = express.Router();


// 1. Abrir ruleta
router.put("/abrir/:id", openRoulette);

// 2. Apostar en la ruleta
router.put("/apostar/:id", PutRoulette);

// 3. Cerrar ruleta
router.put("/cerrar/:id", closeRoulette);

export default router;
