import { IUser, UserRole } from '@/types/user.types';
import mongoose from 'mongoose';

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: UserRole.USER,
  },
});

const User =
  (mongoose.models.user as mongoose.Model<IUser>) ||
  mongoose.model<IUser>('user', userSchema);
export default User;
