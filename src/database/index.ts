import mongoose from 'mongoose';
import 'dotenv/config';

function connectToDatabase() {
  mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/passport', { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.set('useFindAndModify', true);

  const db = mongoose.connection;

  db.on('error', (err) => console.error(err));

  db.once('open', () => {
    console.log('Connected to database!');
  });
}

export default connectToDatabase;
