"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const express = __importStar(require("express"));
const player_1 = require("../schemas/player");
const router = express.Router();
/**
 * Get cookie for unregistered player
 */
router.get('/getCookie', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('/players/getCookie');
    console.log('Existing playerId cookie:', req.cookies.playerId);
    // Check if the cookie already points to an existing Player
    // If true, obtain the existing Player
    // Otherwise, create a new Player
    const existingPlayerId = req.cookies.playerId;
    let player;
    if (existingPlayerId) {
        const existingPlayer = yield player_1.Player.findOne({ playerId: existingPlayerId });
        if (existingPlayer) {
            player = existingPlayer;
        }
        else {
            player = new player_1.Player();
        }
    }
    else {
        player = new player_1.Player();
    }
    // Update the new or existing Player with the new cookie
    const playerId = (0, uuid_1.v4)();
    player.set({ playerId: playerId });
    yield player.save();
    const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        sameSite: 'none',
        secure: true
    };
    res.cookie('playerId', playerId, options);
    res.json({ message: 'cookie set' });
}));
/**
 * Obtain player data by cookie
 */
router.get('/getPlayerByCookie', getPlayer, (req, res) => {
    console.log('Returning: ', res.player);
    res.json(res.player);
});
/**
 * Updates player data (name and highscore) by cookie
 */
router.post('/updateHighscoreByCookie', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const player = new player_1.Player({
        name: req.body.name,
        highscores: req.body.highscores
    });
    console.log('POST this player: ', player);
    try {
        const newPlayer = yield player.save();
        res.status(200).json(newPlayer);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.patch('/', (req, res) => {
    console.log('PATCH using cookies', req.body, req.cookies, req.body.score);
});
/**
 * Obtain player data by id
 * Placed here as it matches all paths before it
 */
router.get('/:id', getPlayer, (req, res) => {
    res.send(res.player.name);
});
router.delete('/:id', (req, res) => {
});
function getPlayer(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Your cookies: ', req.cookies);
        console.log('Your signed cookies: ', req.signedCookies);
        let player = null;
        try {
            if (req.cookies != null) {
                console.log('GET player using cookies: ', req.cookies.playerId);
                player = yield player_1.Player.findOne({ playerId: req.cookies.playerId });
                console.log(player);
            }
            else {
                console.log('GET player using id: ', req.params.id);
                player = yield player_1.Player.findById(req.params.id);
            }
            if (player === null) {
                return res.status(404).json({ message: 'Cannot find player' });
            }
        }
        catch (err) {
            console.log('ERROR: ', err);
            return res.status(500).json({ message: err.message });
        }
        res.player = player;
        next();
    });
}
module.exports = router;
