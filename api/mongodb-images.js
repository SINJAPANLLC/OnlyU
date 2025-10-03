// Backend API for MongoDB image storage
// This would be deployed as a separate service (e.g., Vercel, Netlify Functions)

const { MongoClient, GridFSBucket } = require('mongodb');
const multer = require('multer');

// MongoDB configuration
const MONGODB_URI = 'mongodb+srv://image:bharat19451%23@cluster0.gawhzen.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const DB_NAME = 'fanshub_images';

let client;
let db;
let bucket;

// Initialize MongoDB connection
const connectMongoDB = async () => {
  try {
    if (!client) {
      client = new MongoClient(MONGODB_URI);
      await client.connect();
      db = client.db(DB_NAME);
      bucket = new GridFSBucket(db, { bucketName: 'images' });
      console.log('Connected to MongoDB successfully');
    }
    return { db, bucket };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API endpoint for image upload
const uploadImage = async (req, res) => {
  try {
    const { buffer, originalname, mimetype, size } = req.file;
    const metadata = JSON.parse(req.body.metadata || '{}');
    
    const { bucket } = await connectMongoDB();
    
    const uploadStream = bucket.openUploadStream(originalname, {
      metadata: {
        ...metadata,
        contentType: mimetype,
        uploadDate: new Date(),
        originalName: originalname,
        size: size
      }
    });

    uploadStream.end(buffer);

    uploadStream.on('finish', () => {
      res.json({
        success: true,
        fileId: uploadStream.id,
        filename: originalname,
        contentType: mimetype,
        size: size,
        uploadDate: new Date(),
        mongoUrl: `mongodb://images/${uploadStream.id}`
      });
    });

    uploadStream.on('error', (error) => {
      console.error('Upload error:', error);
      res.status(500).json({ success: false, error: error.message });
    });

  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// API endpoint for image retrieval
const getImage = async (req, res) => {
  try {
    const { fileId } = req.params;
    const { bucket } = await connectMongoDB();
    
    const downloadStream = bucket.openDownloadStream(fileId);
    
    downloadStream.on('error', (error) => {
      res.status(404).json({ success: false, error: 'File not found' });
    });

    downloadStream.pipe(res);
    
  } catch (error) {
    console.error('Get image error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Export for serverless functions
module.exports = {
  uploadImage: [upload.single('image'), uploadImage],
  getImage,
  connectMongoDB
};

// For Express.js setup:
/*
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/upload-image', upload.single('image'), uploadImage);
app.get('/api/image/:fileId', getImage);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/
