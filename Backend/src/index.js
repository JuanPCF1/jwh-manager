import express from "express";
import cors from "cors";
import passport from 'passport'
import session from 'express-session'
import dotenv from 'dotenv';

// Routes are imported here
import adminRouter from './routes/adminRoutes.js';
import contentRouter from './routes/contentRoutes.js';
import clientRouter from './routes/clientRoutes.js';
import companyRouter from './routes/companyRoutes.js';

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

// Add all the routes here
app.use(adminRouter);
app.use(contentRouter);
app.use(clientRouter);
app.use(companyRouter);

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})