"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * Initialize environment variables based on environment
 * NOTE: Change NODE_ENV in .env to prod when deploying
 */
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'prod') {
    dotenv_1.default.config({ path: '.env.production.local' });
}
else {
    dotenv_1.default.config({ path: '.env.development.local' });
}
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
db.on('error', (error) => console.error(error));
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
