import joi from 'joi';

const userValidator = joi.object({
    firstName: joi.string().trim().min(2).max(16).required().custom((value, helpers) => {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }).messages({
        'string.base': 'First name should be a type of text',
        'string.empty': 'First name cannot be empty',
        'string.min': 'First name should have a minimum length of 2',
        'string.max': 'First name should have a maximum length of 16',
        'any.required': 'First name is required',
    }),
    lastName: joi.string().trim().min(2).max(16).required().custom((value, helpers) => {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }).messages({
        'string.base': 'Last name should be a type of text',
        'string.empty': 'Last name cannot be empty',
        'string.min': 'Last name should have a minimum length of 2',
        'string.max': 'Last name should have a maximum length of 16',
        'any.required': 'Last name is required',
    }),
    username: joi.string().trim().min(2).max(26).required().lowercase().messages({
        'string.base': 'Username should be a type of text',
        'string.empty': 'Username cannot be empty',
        'string.min': 'Username should have a minimum length of 2',
        'string.max': 'Username should have a maximum length of 26',
        'any.required': 'Username is required',
    }),
    email: joi.string().trim().email().required().lowercase().messages({
        'string.base': 'Email should be a type of text',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email',
        'any.required': 'Email is required',
    }),
    password: joi.string().trim().min(6).max(24).required().messages({
        'string.base': 'Password should be a type of text',
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password should have a minimum length of 6',
        'string.max': 'Password should have a maximum length of 24',
        'any.required': 'Password is required',
    }),
});

export default userValidator;
