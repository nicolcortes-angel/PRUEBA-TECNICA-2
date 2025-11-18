import mongoose from "mongoose";

const betSchema = new mongoose.Schema({
  userId:
   { type: String, 
    required: true },

  amount: { type: Number, 
    required: true, max: 10000 },

  number: { type: Number, min: 0, max: 36 },

  color: { type: String, enum: ["red", "black"] }
});

const rouletteSchema = new mongoose.Schema({
  state: { type: String, default: "closed" },

  bets: [betSchema],
  
  createdAt: { type: Date, default: Date.now }
});

export const Roulette = mongoose.model("Roulette", rouletteSchema);