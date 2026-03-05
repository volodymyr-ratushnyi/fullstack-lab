import mongoose from "mongoose"

export const runDB = () => {
  mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/test')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection failed:', err));
}
