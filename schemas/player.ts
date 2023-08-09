import mongoose from "mongoose";
import { Settings, SettingsSchema } from "./settings";
import { Highscore, HighscoreSchema } from "./highscore";

const PlayerSchema = new mongoose.Schema({
  name: String,
  playerId: String,
  createdOn: { type: Date, default: Date.now },
  highscores: { type: [HighscoreSchema], },
  settings: {type: SettingsSchema, default: new Settings() }
});

export const Player = mongoose.model('Player', PlayerSchema);