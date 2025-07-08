import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' }); // ✅ Load environment variables
import app from './app.js'; // ✅ Your Express app
import { v2 as cloudinary } from 'cloudinary';
// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Start listening on the Render-provided port
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
