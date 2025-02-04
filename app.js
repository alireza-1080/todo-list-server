import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import authRouter from './routers/authRouter.js';
import todoRouter from './routers/todoRouter.js';

//! Create express app
const app = express();

//! Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());

//! Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/todo', todoRouter);

export default app;
