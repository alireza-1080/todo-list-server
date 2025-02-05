import User from '../models/user.js';
import Todo from '../models/todo.js';
import todoValidator from '../validators/todoValidator.js';

const createTodo = async (req, res) => {
  try {
    //! get todo title from the request body
    const { title, userId } = req.body;
    
    //! create a new todo sample object
    const todoSample = {
      title,
      user: userId,
    };

    //! validate the todo object
    const { error, value: validatedTodo } = todoValidator.validate(todoSample);
    
    //! throw an error if the todo object is invalid
    if (error) {
      throw new Error(error.message);
    }

    //! check if the user exists
    const user = await User.findById(userId);

    //! throw an error if the user does not exist
    if (!user) {
      throw new Error('User not found');
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

    //! update the todo title
    todo.title = title;

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
    //! get todo id from the request params
    const { id } = req.params;

    //! find the todo by id
    const todo = await Todo.findById(id);

    //! throw an error if the todo is not found
    if (!todo) {
      throw new Error('Todo not found');
    }
    
    //! update the todo status
    todo.isCompleted = !todo.isCompleted;

    //! save the updated todo
    await todo.save();
    
    //! return the success message
    return res.status(200).json({ message: 'Todo status updated' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  console.log('deleteTodo');
  try {
    //! get todo id from the request params
    const { id } = req.params;

    //! find the todo by id
    const todo = await Todo.findById(id);

    //! throw an error if the todo is not found
    if (!todo) {
      throw new Error('Todo not found');
    }

    //! delete the todo
    await todo.deleteOne();

    //! return the success message
    return res.status(200).json({ message: 'Todo deleted' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export { createTodo, updateTodo, updateStatus, deleteTodo };
