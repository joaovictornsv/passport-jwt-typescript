import mongoose from 'mongoose';

export interface IUser {
  _id: string;
  name: string;
  username: string;
  password: string;
  pets: string[];
}

const UserSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String },
  password: { type: String },
  pets: [{ type: mongoose.Types.ObjectId, ref: 'Pet' }],
});

export default mongoose.model<IUser>('User', UserSchema);
