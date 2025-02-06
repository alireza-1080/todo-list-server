import mongoose from 'mongoose';
import User from '../models/user.js';
import userValidator from '../validators/userValidator.js';
import bcrypt from 'bcryptjs'; // Change this line
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
  try {
    //! get user data from the request body
    const { firstName, lastName, username, email, password } = req.body;

    //! create user sample object
    const userSample = { firstName, lastName, username, email, password };

    //! validate user data
    const { error, value: validatedUser } = userValidator.validate(userSample);

    //! throw an error if the user data is invalid
    if (error) {
      throw new Error(error.message);
    }

    //! hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validatedUser.password, salt);

    //! replace the user password with the hashed password
    validatedUser.password = hashedPassword;

    //! create a new user
    const user = new User(validatedUser);

    //! save the user to the database
    await user.save();

    //! create a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    //! set the token in the response header
    res.cookie('auth-token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000,
      secure: false,
      path: '/',
    });

    //! return a success message
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during registration:', error.message);
    return res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    //! get user identifier and password from the request body
    const { identifier, password } = req.body;

    //! throw an error if the user identifier or password is not provided
    if (!identifier || !password) {
      throw new Error('Email/Username and password are required');
    }

    //! convert the user identifier to lowercase
    const identifierLower = identifier.toLowerCase();

    //! find a user by email or username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    //! throw an error if the user is not found
    if (!user) {
      throw new Error('User not found');
    }

    //! compare the user password with the provided password
    const validPassword = await bcrypt.compare(password, user.password);

    //! throw an error if the password is invalid
    if (!validPassword) {
      throw new Error('Invalid password');
    }

    //! create a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    //! set the token in the response header
    res.cookie('auth-token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000,
      secure: false,
      path: '/',
    });

    //! return a success message
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const logout = async (_req, res) => {
  try {
    //! clear the token in the response header
    res.clearCookie('auth-token');

    //! return a success message
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const isLoggedIn = async (req, res) => {
  try {
    //! get the token from the header authorization
    const token = req.headers.authorization.split(' ')[1];

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

    //! return a success message
    return res.status(200).json({ message: 'User is logged in' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    //! get token from the header authorization
    const token = req.headers.authorization.split(' ')[1];

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

    //! get the user id from the verified token
    const { _id: id } = verified;

    //! find a user by id
    const user = await User.findById(id)
      .select({
      password: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
      username: 0,
      email: 0,
      })
      .populate({
      path: 'todos',
      select: { __v: 0, createdAt: 0, updatedAt: 0 },
      options: { sort: { _id: -1 } }
      });

    //! throw an error if the user is not found
    if (!user) {
      throw new Error('User not found');
    }

    //! return the user
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export { register, login, logout, isLoggedIn, getMe };
