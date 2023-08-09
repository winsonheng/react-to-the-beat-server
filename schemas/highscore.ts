import mongoose from "mongoose";

export const HighscoreSchema = new mongoose.Schema({
  songName: { type: String, required: true },
  score: { type: Number, min: 0, max: 1000000, required: true },
  grade: { type: String, enum: ['D', 'C', 'B', 'A', 'S', 'SS', 'SSS'] }
});

export const Highscore = mongoose.model('Highscore', HighscoreSchema);