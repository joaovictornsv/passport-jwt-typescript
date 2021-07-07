import mongoose from 'mongoose';

function generateObjectId() {
  return mongoose.Types.ObjectId();
}

export { generateObjectId };
