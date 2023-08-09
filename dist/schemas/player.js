"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const settings_1 = require("./settings");
const highscore_1 = require("./highscore");
const PlayerSchema = new mongoose_1.default.Schema({
    name: String,
    playerId: String,
    createdOn: { type: Date, default: Date.now },
    highscores: { type: [highscore_1.HighscoreSchema], },
    settings: { type: settings_1.SettingsSchema, default: new settings_1.Settings() }
});
exports.Player = mongoose_1.default.model('Player', PlayerSchema);
