import joi from 'joi';
import mongoose from 'mongoose';

const todoValidator = joi.object({
  title: joi.string().trim().min(2).max(100).required().messages({
    'string.base': 'Title should be a type of text',
    'string.empty': 'Title cannot be empty',
    'string.min': 'Title should have a minimum length of 2',
    'string.max': 'Title should have a maximum length of 100',
    'any.required': 'Title is required',
  }),
  user: joi
    .string()
    .trim()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .messages({
      'any.invalid': 'Invalid user ID',
    }),
});

export default todoValidator;
