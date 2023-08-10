import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import * as express from "express";
import { Player } from '../schemas/player';

const router = express.Router();

/**
 * Get cookie for unregistered player
 */
router.get('/getCookie', async (req: Request, res: Response) => {
  console.log('/players/getCookie');
  console.log('Existing playerId cookie:', req.cookies.playerId);

  // Check if the cookie already points to an existing Player
  // If true, obtain the existing Player
  // Otherwise, create a new Player

  const existingPlayerId = req.cookies.playerId;
  let player;

  if (existingPlayerId) {
    const existingPlayer = await Player.findOne({ playerId: existingPlayerId });

    if (existingPlayer) {
      player = existingPlayer;
    } else {
      player = new Player(); 
    }
  } else {
    player = new Player(); 
  }

  // Update the new or existing Player with the new cookie

  const playerId = uuidv4();
  player.set({ playerId: playerId });

  await player.save();

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Cookie expires in 30 days
    sameSite: 'none' as const,
    secure: true
  };

  res.cookie('playerId', playerId, options);
  res.json({ message: 'cookie set' });
});

/**
 * Obtain player data by cookie
 */
router.get('/getPlayerByCookie', getPlayer, (req: Request, res: Response) => {
  console.log('Returning: ', res.locals.player);
  res.json(res.locals.player);
})

/**
 * Updates player data (name and highscore) by cookie
 */
router.post('/updateHighscoreByCookie', async (req: Request, res: Response) => {
  const player = new Player({
    name: req.body.name,
    highscores: req.body.highscores
  });

  console.log('POST this player: ', player);

  try {
    const newPlayer = await player.save();
    res.status(200).json(newPlayer);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/', (req: Request, res: Response) => {
  console.log('PATCH using cookies', req.body, req.cookies, req.body.score);
});

/**
 * Obtain player data by id
 * Placed here as it matches all paths before it
 */
router.get('/:id', getPlayer, (req: Request, res: Response) => {
  res.send(res.locals.player.name);
});

router.delete('/:id', (req: Request, res: Response) => {

});

async function getPlayer(req: Request, res: Response, next: any) {
  console.log('Your cookies: ', req.cookies);
  console.log('Your signed cookies: ', req.signedCookies);
  let player = null;
  try {
    if (req.cookies != null) {
      console.log('GET player using cookies: ', req.cookies.playerId);
      player = await Player.findOne({playerId: req.cookies.playerId});
      console.log(player);
    } else {
      console.log('GET player using id: ', req.params.id);
      player = await Player.findById(req.params.id);
    }

    if (player === null) {
      return res.status(404).json({ message: 'Cannot find player' });
    }
  } catch (err: any) {
    console.log('ERROR: ', err);
    return res.status(500).json({ message: err.message });
  }

  res.locals.player = player;
  next();
}

module.exports = router;