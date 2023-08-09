import mongoose from "mongoose";

export const SettingsSchema = new mongoose.Schema({
  sfxOn: { type: Boolean, default: true },
  volume: { type: Number, min: 0, max: 100, default: 100 },
  topKey1: { type: String, default: 'S' },
  topKey2: { type: String, default: 'D' },
  bottomKey1: { type: String, default: 'J' },
  bottomKey2: { type: String, default: 'K' },
});

export const Settings = mongoose.model('Settings', SettingsSchema);