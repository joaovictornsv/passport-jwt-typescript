import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String },
  password: { type: String },
  pets: [{ type: mongoose.Types.ObjectId, ref: 'Pet' }],
});

export default mongoose.model('User', UserSchema);
