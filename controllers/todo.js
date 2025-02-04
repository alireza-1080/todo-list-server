import User from '../models/user.js';
import Todo from '../models/todo.js';
import todoValidator from '../validators/todoValidator.js';

const createTodo = async (req, res) => {
  try {
    //! get token from the request header
    const token = req.cookies?.auth_token;

    //! throw an error if the token is not provided
    if (!token) {
      throw new Error('Token not provided');
    }

    //! verify the token
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    //! throw an error if the token is invalid
    if (!verified) {
      throw new Error('Invalid token');
    }

    //! get user id from the verified token
    const userId = verified.id;

    //! check if the user exists
    const user = await User.findById(userId);

    //! throw an error if the user does not exist
    if (!user) {
      throw new Error('User not found');
    }

    //! get todo title from the request body
    const { title } = req.body;

    //! create a new todo sample object
    const todoSample = {
      title,
      user: userId,
    };

    //! validate the todo object
    const { error, value: validatedTodo } = todoValidator.validate(todo);

    //! throw an error if the todo object is invalid
    if (error) {
      throw new Error(error.message);
    }

    //! create a new todo
    const todo = await Todo.create(validatedTodo);

    //! return the success message
    return res.status(201).json({ message: 'Todo created' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    //! get token from the request header
    const token = req.cookies?.auth_token;

    //! throw an error if the token is not provided
    if (!token) {
      throw new Error('Token not provided');
    }

    //! verify the token
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    //! throw an error if the token is invalid
    if (!verified) {
      throw new Error('Invalid token');
    }

    //! get user id from the verified token
    const userId = verified.id;

    //! get todo id from the request params
    const { id } = req.params;

    //! get todo title from the request body
    const { title } = req.body;

    //! find the todo by id
    const todo = await Todo.findById(id);

    //! throw an error if the todo is not found
    if (!todo) {
      throw new Error('Todo not found');
    }

    //! throw an error if the user is not the owner of the todo
    if (todo.user.toString() !== userId) {
      throw new Error('You are not the owner of this todo');
    }

    //! update the todo title
    todo.title = title;

    //! validate the todo object
    const { error, value: validatedTodo } = todoValidator.validate(todo);

    //! throw an error if the todo object is invalid
    if (error) {
      throw new Error(error.message);
    }

    //! save the updated todo
    await todo.save();

    //! return the success message
    return res.status(200).json({ message: 'Todo updated' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    //! get token from the request header
    const token = req.cookies?.auth_token;

    //! throw an error if the token is not provided
    if (!token) {
      throw new Error('Token not provided');
    }

    //! verify the token
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    //! throw an error if the token is invalid
    if (!verified) {
      throw new Error('Invalid token');
    }

    //! get user id from the verified token
    const userId = verified.id;

    //! get todo id from the request params
    const { id } = req.params;

    //! find the todo by id
    const todo = await Todo.findById(id);

    //! throw an error if the todo is not found
    if (!todo) {
      throw new Error('Todo not found');
    }

    //! throw an error if the user is not the owner of the todo
    if (todo.user.toString() !== userId) {
      throw new Error('You are not the owner of this todo');
    }

    //! update the todo status
    todo.status = !todo.status;

    //! save the updated todo
    await todo.save();

    //! return the success message
    return res.status(200).json({ message: 'Todo status updated' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    //! get token from the request header
    const token = req.cookies?.auth_token;

    //! throw an error if the token is not provided
    if (!token) {
      throw new Error('Token not provided');
    }

    //! verify the token
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    //! throw an error if the token is invalid
    if (!verified) {
      throw new Error('Invalid token');
    }

    //! get user id from the verified token
    const userId = verified.id;

    //! get todo id from the request params
    const { id } = req.params;

    //! find the todo by id
    const todo = await Todo.findById(id);

    //! throw an error if the todo is not found
    if (!todo) {
      throw new Error('Todo not found');
    }

    //! throw an error if the user is not the owner of the todo
    if (todo.user.toString() !== userId) {
      throw new Error('You are not the owner of this todo');
    }

    //! delete the todo
    await todo.delete();

    //! return the success message
    return res.status(200).json({ message: 'Todo deleted' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export { createTodo, updateTodo, updateStatus, deleteTodo };
