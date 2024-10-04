const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Allowed file types and their corresponding MIME types
const allowedFiles = {
  pdf: {
    mimeTypes: ["application/pdf"],
    extensions: [".pdf"],
    maxSize: 5 * 1024 * 1024, // 5 MB
  },
  image: {
    mimeTypes: ["image/jpeg", "image/png", "image/gif", "text/html"],
    extensions: [".jpg", ".jpeg", ".png", ".gif"],
    maxSize: 2 * 1024 * 1024, // 2 MB
  },
};

// Use memory storage
const storage = multer.memoryStorage();

// File filter function
const fileFilter = (req, file, cb) => {
  console.log("--- File Upload Attempt ---");
  console.log(`Field name: ${file.fieldname}`);
  console.log(`File name: ${file.originalname}`);
  console.log(`Reported MIME type: ${file.mimetype}`);

  const ext = path.extname(file.originalname).toLowerCase();
  console.log(`File extension: ${ext}`);

  const fileType = file.fieldname === "pdf" ? "pdf" : "image";
  const allowedType = allowedFiles[fileType];

  if (!allowedType) {
    return cb(new Error(`Unexpected field name: ${file.fieldname}`), false);
  }

  if (
    !allowedType.mimeTypes.includes(file.mimetype) ||
    !allowedType.extensions.includes(ext)
  ) {
    return cb(
      new Error(
        `Invalid file type or extension for ${fileType}. Received MIME type: ${file.mimetype}, Extension: ${ext}`
      ),
      false
    );
  }

  cb(null, true);
};

// Create multer upload instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: Math.max(allowedFiles.pdf.maxSize, allowedFiles.image.maxSize),
  },
});

// Middleware for handling file uploads
const uploadFiles = upload.fields([
  { name: "pdf", maxCount: 1 },
  { name: "picture", maxCount: 1 },
]);

// Helper function to upload file to Cloudinary
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "uploads",
        resource_type: "auto",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    const readableStream = new Readable({
      read() {
        this.push(file.buffer);
        this.push(null);
      },
    });

    readableStream.pipe(uploadStream);
  });
};

// Middleware to handle file uploads and Cloudinary upload
const handleUpload = async (req, res, next) => {
  try {
    if (req.files) {
      for (let fieldname in req.files) {
        const file = req.files[fieldname][0];
        const result = await uploadToCloudinary(file);
        req.body[fieldname] = result.secure_url;
      }
    }
    next();
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    next(error);
  }
};

module.exports = {
  uploadFiles,
  handleUpload,
};
