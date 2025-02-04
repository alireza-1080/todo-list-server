import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import authRouter from './routers/authRouter.js';
import todoRouter from './routers/todoRouter.js';
import "dotenv/config.js";

//! Create express app
const app = express();

//! Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

//! Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/todo', todoRouter);

export default app;
