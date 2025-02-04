import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide your first name'],
      min: [2, 'Too short'],
      max: [16, 'Too long'],
    },
    lastName: {
      type: String,
      required: [true, 'Please provide your last name'],
      min: [2, 'Too short'],
      max: [16, 'Too long'],
    },
    username: {
      type: String,
      required: [true, 'Please provide your username'],
      min: [2, 'Too short'],
      max: [26, 'Too long'],
      unique: [true, 'Username already exists'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      min: [6, 'Too short'],
      max: [255, 'Too long'],
      unique: [true, 'Email already exists'],
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      min: [6, 'Too short'],
      max: [24, 'Too long'],
    },
  },
  { timestamps: true }
);

//! Define todos as a virtual field
userSchema.virtual('todos', {
  ref: 'Todo',
  localField: '_id',
  foreignField: 'user',
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

const User = mongoose.model('User', userSchema);

export default User;
