import express, { json } from 'express';

import authRouter from './routes/authRouter';
import urlRouter from './routes/urlsRouter';

const app = express();
app.use(json());
app.use(authRouter);
app.use(urlRouter);

export default app;
