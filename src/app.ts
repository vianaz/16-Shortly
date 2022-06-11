import express, { json } from 'express';

import authRouter from './routes/authRouter';
import urlRouter from './routes/urlsRouter';
import userRouter from './routes/usersRouter';

const app = express();
app.use(json());
app.use(authRouter);
app.use(urlRouter);
app.use(userRouter);

export default app;
