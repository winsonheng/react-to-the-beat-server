import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
app.use(express.json());

/**
 * Initialize environment variables based on environment
 */
if (app.get('env') === 'production') {
  dotenv.config({ path: '.env.production.local' });
} else {
  dotenv.config({ path: '.env.development.local' });
}

// Set up rate limiter: maximum of twenty requests per minute
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
});
app.use(limiter);

/**
 * Initialize CORS settings
 */

const cors = require("cors");
const corsOptions = {
  origin: process.env.ALLOW_ORIGIN_HEADER, 
  credentials: true,
  optionSuccessStatus: 200,
  exposedHeaders: ["Set-Cookie"],
};

app.use(cors(corsOptions));

/**
 * Initialize cookie settings
 * App will use cookie to obtain player info if player did not login
 */


const cookieParser = require('cookie-parser');
app.use(cookieParser());

/**
 * Initialize MongoDB settings
 */

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error: Error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

/**
 * Set up the url routes
 */

const leaderboardRouter = require('./routes/leaderboards');
app.use('/leaderboards', leaderboardRouter);

const playerRouter = require('./routes/players');
app.use('/players', playerRouter);


/**
 * Start server on port
 */
app.listen(process.env.PORT, () => console.log('Server has started on port:', process.env.PORT));

