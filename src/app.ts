import express, { json } from 'express';

import authRouter from './routes/authRouter';

const app = express();
app.use(json());
app.use(authRouter);

export default app;
