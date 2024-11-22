const multer = require("multer");
const path = require("path");

// Cấu hình Multer để lưu trữ ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img"); // Đường dẫn thư mục lưu trữ hình ảnh
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Tạo tên tệp duy nhất
  },
});
const upload = multer({ storage });
module.exports = { upload };
