import express from 'express';
import { router } from './routes';
import connectToDatabase from './database';

const app = express();

connectToDatabase();

app.use(router);

export { app }