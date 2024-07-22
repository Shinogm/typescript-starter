import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  phone: String,
  email: String,
});

export const UserSchema = mongoose.model('User', userSchema);
