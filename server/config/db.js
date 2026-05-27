import mongoose from 'mongoose';

const connectDB = async () => {
  try {
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/careerflow-ai';
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
};

export default connectDB;
