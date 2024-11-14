import multer from "multer";
import path from "path";

// Multipart form data --> not json data, we also receive images
// Multer Setup (Where file is stored, file name, file path)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random() * 1e9}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// Create multer instance with storage and limits
const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 100 }, // Max file size: 100MB
}).fields([
  { name: "image", maxCount: 1 }, // "image" is the field name for the image file
  { name: "pdf", maxCount: 1 },   // "pdf" is the field name for the PDF file
]);

export default handleMultipartData;
