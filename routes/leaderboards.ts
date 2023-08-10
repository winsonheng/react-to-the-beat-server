import express, { Request, Response } from "express";
const router = express.Router();
const Leaderboard = require('../schemas/leaderboard');

router.get('/:userid', (req: Request, res: Response) => {
  console.log(req.params.id);
});

router.patch('/:userid', (req: Request, res: Response) => {

});

router.delete('/:userid', (req: Request, res: Response) => {

});

router.post('/', (req: Request, res: Response) => {

});

module.exports = router;