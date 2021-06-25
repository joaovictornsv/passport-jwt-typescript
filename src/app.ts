import express from 'express';
import cookieParser from 'cookie-parser';
import { router } from './routes';
import connectToDatabase from './database';

const app = express();

connectToDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(router);

export { app };
