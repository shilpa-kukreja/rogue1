// config/multer.js
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage for all files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = path.join(__dirname, '../public/uploads');
    
    // Determine subfolder based on file type
    if (file.fieldname.startsWith('images_')) {
      uploadPath = path.join(uploadPath, 'images');
    } else if (file.fieldname.startsWith('animations_')) {
      uploadPath = path.join(uploadPath, 'animations');
    } else if (file.fieldname.startsWith('video_')) {
      // Videos will be processed in memory for Cloudinary
      return cb(null, null); // Skip disk storage for videos
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Create upload instance
export const upload = multer({ 
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});