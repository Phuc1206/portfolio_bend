const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const API_SECRET = process.env.API_SECRET;
const API_KEY = process.env.API_KEY;
const CLOUD_NAME = process.env.CLOUD_NAME;
// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: CLOUD_NAME, // Thay bằng Cloud name của bạn
  api_key: API_KEY, // Thay bằng API key
  api_secret: API_SECRET, // Thay bằng API secret
});

// Cấu hình Cloudinary Storage cho Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio", // Thư mục trên Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"], // Các định dạng được phép
    use_filename: true, // Sử dụng tên tệp gốc nếu cần
    unique_filename: true, // Tạo tên duy nhất cho mỗi tệp
  },
});

// Khởi tạo Multer với Cloudinary Storage
const upload = multer({ storage });

module.exports = { upload };
