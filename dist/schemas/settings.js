"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = exports.SettingsSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.SettingsSchema = new mongoose_1.default.Schema({
    sfxOn: { type: Boolean, default: true },
    volume: { type: Number, min: 0, max: 100, default: 100 },
    topKey1: { type: String, default: 'S' },
    topKey2: { type: String, default: 'D' },
    bottomKey1: { type: String, default: 'J' },
    bottomKey2: { type: String, default: 'K' },
});
exports.Settings = mongoose_1.default.model('Settings', exports.SettingsSchema);
