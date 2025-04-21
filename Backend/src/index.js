import express from "express";
import cors from "cors";
import passport from 'passport'
import session from 'express-session'
import dotenv from 'dotenv';

import adminRouter from './routes/adminRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

const port = 5000;
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(
    session({
        secret: 'group-13',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 6000 * 60
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(adminRouter);

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})