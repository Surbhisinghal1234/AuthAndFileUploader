// src/components/FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [fileType, setFileType] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileType(selectedFile.type);
      setPreviewUrl(URL.createObjectURL(selectedFile)); // Preview before upload
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, formData);
      console.log('Upload successful:', response.data);
      
      const fileUrl = response.data.secure_url; 
      const backendResponse = await axios.post('http://localhost:3000/api/upload', { fileUrl }); 

      console.log('File URL sent to backend:', backendResponse.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const renderPreview = () => {
    switch (fileType) {
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
        return <img src={previewUrl} alt="Preview" style={{ width: '300px', height: 'auto' }} />;
      case 'audio/mpeg':
      case 'audio/wav':
        return <audio controls src={previewUrl} />;
      case 'video/mp4':
        return <video controls src={previewUrl} style={{ width: '300px' }} />;
      case 'application/pdf':
        return <iframe src={previewUrl} width="300" height="400" title="PDF Preview" />;
      default:
        return <p>Unsupported file type for preview.</p>;
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {previewUrl && (
        <div>
          <h3>Preview:</h3>
          {renderPreview()}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
