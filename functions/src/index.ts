import * as functions from 'firebase-functions';
import * as express from 'express';
import authRouter from './routes/auth.route';
import * as cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);

export const api = functions.https.onRequest(app);
