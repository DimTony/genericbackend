const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const fs = require('fs');
const os = require('os');
const path = require('path');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, os.tmpdir()); // Use the system's temp directory
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'introVideo') {
    if (
      [
        'video/mp4',
        'video/quicktime',
        'video/x-msvideo',
        'video/x-ms-wmv',
        'video/x-flv',
        'video/webm',
        'video/x-matroska',
        'video/hevc',
      ].includes(file.mimetype)
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          'Invalid video format. Allowed formats: MP4, MOV, AVI, WMV, FLV, WebM, MKV, HEVC'
        ),
        false
      );
    }
  } else if (
    file.fieldname === 'fullBodyPhoto' ||
    file.fieldname === 'headShotPhoto' ||
    file.fieldname === 'receiptPhoto'
  ) {
    if (
      [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/bmp',
        'image/webp',
        'image/heic',
      ].includes(file.mimetype)
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          'Invalid image format. Allowed formats: JPEG, PNG, GIF, BMP, WebP, HEIC'
        ),
        false
      );
    }
  } else {
    cb(new Error('Unexpected field'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2000 * 1024 * 1024, // 2 GB limit
  },
});

const uploadToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'farmer_wants_a_wife_applications',
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    fs.createReadStream(file.path).pipe(uploadStream);
  });
};

const handleUpload = async (req, res, next) => {
  try {
    if (req.files) {
      for (let fieldname in req.files) {
        const file = req.files[fieldname][0];
        const result = await uploadToCloudinary(file);
        req.body[fieldname] = result.secure_url;
        // Delete the temp file
        fs.unlinkSync(file.path);
      }
    }
    next();
  } catch (error) {
    // If there's an error, make sure to delete any uploaded files
    if (req.files) {
      for (let fieldname in req.files) {
        const file = req.files[fieldname][0];
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      }
    }
    next(error);
  }
};

module.exports = {
  upload,
  handleUpload,
};
