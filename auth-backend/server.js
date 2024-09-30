import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import File from './models/fileModel.js'; 

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
  origin: '*',
}));

app.use(express.urlencoded({ extended: true }));

const connectToMongoDB = async () => {
  const username = process.env.MONGO_USERNAME;
  const password = encodeURIComponent(process.env.MONGO_PASSWORD);

  try {
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@cluster0.3j0ywmp.mongodb.net/myDatabase?retryWrites=true&w=majority`
    );
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error', error);
  }
};

connectToMongoDB();


app.post('/api/upload', async (req, res) => {
  const { fileUrl } = req.body;

  if (!fileUrl) {
    return res.status(400).json({ message: 'File URL is required' });
  }

  try {
    const newFile = new File({ fileUrl });
    await newFile.save(); 

    console.log('File URL saved', fileUrl);
    res.status(200).json({ message: 'File URL saved successfully', fileUrl });
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ message: 'Error saving file URL' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
