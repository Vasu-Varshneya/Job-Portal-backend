import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' }); // use correct path

import app from './app.js'; // go up one level
import { v2 as cloudinary } from 'cloudinary';

// Configure cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default app; // ✅ This is key — no app.listen()
