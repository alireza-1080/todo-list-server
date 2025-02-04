import express from 'express';
import { register, login, logout, isLoggedIn, getMe } from '../controllers/auth.js';

const authRouter = express.Router();

authRouter.post('/register', register);

authRouter.post('/login', login);

authRouter.post('/logout', logout);

authRouter.post('/is-logged-in', isLoggedIn);

authRouter.get('/get-me/:id', getMe)

export default authRouter;
