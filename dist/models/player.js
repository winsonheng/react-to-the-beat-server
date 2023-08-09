"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = exports.playerSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.playerSchema = new mongoose_1.default.Schema({
    name: String,
    playerId: String,
    createdOn: { type: Date, default: Date.now },
    highscores: [{
            songName: { type: String, required: true },
            score: { type: Number, min: 0, max: 1000000, required: true },
            grade: { type: String, enum: ['D', 'C', 'B', 'A', 'S', 'SS', 'SSS'] }
        }],
    preferences: {
        type: {
            sfxOn: { type: Boolean, default: true },
            volume: { type: Number, min: 0, max: 100, default: 100 },
            topKey1: { type: String, default: 'S' },
            topKey2: { type: String, default: 'D' },
            bottomKey1: { type: String, default: 'J' },
            bottomKey2: { type: String, default: 'K' },
        },
    }
});
exports.Player = mongoose_1.default.model('Player', exports.playerSchema);
