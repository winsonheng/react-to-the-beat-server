"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Highscore = exports.HighscoreSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.HighscoreSchema = new mongoose_1.default.Schema({
    songName: { type: String, required: true },
    score: { type: Number, min: 0, max: 1000000, required: true },
    grade: { type: String, enum: ['D', 'C', 'B', 'A', 'S', 'SS', 'SSS'] }
});
exports.Highscore = mongoose_1.default.model('Highscore', exports.HighscoreSchema);
