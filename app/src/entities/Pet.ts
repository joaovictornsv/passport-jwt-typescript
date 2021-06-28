import mongoose from 'mongoose';

const PetSchema = new mongoose.Schema({
  category: { type: String },
  name: { type: String },
  owner_id: { type: mongoose.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Pet', PetSchema);
