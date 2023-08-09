"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const leaderboardSchema = new mongoose_1.default.Schema({
    highscores: [{
            name: String,
            score: Number
        }],
    lastUpdated: {
        type: Date,
        required: true,
        default: Date.now
    }
});
module.exports = mongoose_1.default.model('Leaderboard', leaderboardSchema);
