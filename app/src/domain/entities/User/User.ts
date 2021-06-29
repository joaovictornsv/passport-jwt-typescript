import mongoose from 'mongoose';
import { IUser } from './IUser';

const UserSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String },
  password: { type: String },
});

export default mongoose.model<IUser>('User', UserSchema);
