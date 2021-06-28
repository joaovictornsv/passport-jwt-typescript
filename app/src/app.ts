import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { router } from '~/routes';
import connectToDatabase from '~/database';
import passportStrategy from '~/config/passport';

const app = express();

connectToDatabase();

passportStrategy(passport);
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(router);

export { app };
