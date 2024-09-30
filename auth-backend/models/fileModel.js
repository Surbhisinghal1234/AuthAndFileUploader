import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const File = mongoose.model('File', fileSchema);

export default File;
