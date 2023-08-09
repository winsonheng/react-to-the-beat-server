"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Leaderboard = require('../models/leaderboard');
router.get('/:userid', (req, res) => {
    console.log(req.params.id);
});
router.patch('/:userid', (req, res) => {
});
router.delete('/:userid', (req, res) => {
});
router.post('/', (req, res) => {
});
module.exports = router;
