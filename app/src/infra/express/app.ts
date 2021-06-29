import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { router } from './routes';
import connectToDatabase from '~/infra/database';
import passportStrategy from '~/infra/config/passport';

const app = express();

connectToDatabase();

passportStrategy(passport);
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(router);

export { app };
