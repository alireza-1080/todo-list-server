import express from 'express';
import { createTodo, updateTodo, updateStatus, deleteTodo } from '../controllers/todo.js';

const todoRouter = express.Router();

todoRouter.post('/create', createTodo);

todoRouter.post('/update/:id', updateTodo);

todoRouter.post('update-status/:id', updateStatus);

todoRouter.delete('/:id', deleteTodo);

export default todoRouter;